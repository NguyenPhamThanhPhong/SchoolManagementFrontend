import React, { useEffect, useRef, useState } from 'react';
import { SolutionOutlined, TeamOutlined, UserOutlined, PartitionOutlined } from '@ant-design/icons';
import { Card, Statistic, Row, Col } from 'antd';
import Chart from 'chart.js/auto';
import './Home.scss';

import { useUserContext } from '../../../data-store';
import { FacultyApi, StudentApi, lecturerApi, schoolClassApi } from '../../../data-api';

function Home() {
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const [facultyData, setFacultyData] = useState([]);
    const [totalStudent, setTotalStudent] = useState([]);
    const [totalLecturer, setTotalLecturer] = useState(0);
    const [totalClass, setTotalClass] = useState(0);
    const [studentCountByFaculty, setStudentCountByFaculty] = useState({});


    useEffect(() => {
        const fetchFacultyData = async () => {
            try {
                const response = await FacultyApi.getAll();
                if (!response.isError) {
                    setFacultyData(response.data);
                } else {
                    console.error('Error fetching faculty data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching faculty data:', error);
            }
        };

        const fetchTotalStudent = async () => {
            try {
                const response = await StudentApi.studentGetAll();
                console.log(response.data.data);
                if (!response.isError) {
                    setTotalStudent(response.data);

                    const countByFaculty = {};
                    response.data.data.forEach(student => {
                        const facultyId = student.personalInfo.facultyId;
                        if (facultyId) {
                            countByFaculty[facultyId] = (countByFaculty[facultyId] || 0) + 1;
                        }
                    });
                    setStudentCountByFaculty(countByFaculty);
                } else {
                    console.error('Error fetching total students:', response.data);
                }
            } catch (error) {
                console.error('Error fetching total students:', error);
            }
        };

        const fetchTotalLecturer = async () => {
            try {
                const response = await lecturerApi.lecturerGetAll();
                if (!response.isError) {
                    setTotalLecturer(response.data);
                } else {
                    console.error('Error fetching total lecturer:', response.data);
                }
            } catch (error) {
                console.error('Error fetching total lecturer:', error);
            }
        };

        const fetchTotalClass = async () => {
            try {
                const response = await schoolClassApi.classGetAll();
                if (!response.isError) {
                    setTotalClass(response.data);
                } else {
                    console.error('Error fetching total class:', response.data);
                }
            } catch (error) {
                console.error('Error fetching total class:', error);
            }
        };

        fetchFacultyData();
        fetchTotalStudent();
        fetchTotalLecturer();
        fetchTotalClass();
    }, []);



    useEffect(() => {
        // Biểu đồ barChart
        const barCtx = barChartRef.current.getContext('2d');
        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: facultyData?.data?.map(faculty => faculty.name),
                datasets: [
                    {
                        label: 'Number of Students',
                        barPercentage: 0.7,
                        barThickness: 60,
                        data: facultyData?.data?.map(faculty => studentCountByFaculty[faculty.id] || 0),
                        backgroundColor: 'blue',
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0, // Đặt độ chính xác của số nguyên
                            stepSize: 1,  // Bước giữa các giá trị trên trục y
                        },
                    },
                },
            },
        });

        // Hủy biểu đồ khi component unmount
        return () => {
            barChart.destroy();
        };
    }, [facultyData, studentCountByFaculty]);

    const processFinalScores = (data) => {
        const scoreRanges = [0, 3, 5, 7, 8, 9, 11];
        const scoreCount = [0, 0, 0, 0, 0, 0];

        data?.forEach((student) => {
            const finalScore = student.creditLogs.length > 0 ? student.creditLogs[0].final : null;

            if (finalScore !== null) {
                for (let i = 0; i < scoreRanges.length - 1; i++) {
                    if (finalScore >= scoreRanges[i] && finalScore < scoreRanges[i + 1]) {
                        scoreCount[i]++;
                        break;
                    }
                }
            }
        });

        return scoreCount;
    };
    useEffect(() => {

        const processedScores = processFinalScores(totalStudent?.data);

        // Biểu đồ pie Chart
        const pieCtx = pieChartRef.current.getContext('2d');
        const pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['0-3', '3-5', '5-7', '7-8', '8-9', '9-10'],
                datasets: [
                    {
                        data: processedScores,
                        backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'black'],
                    },
                ],
            },
        });
        return () => {
            pieChart.destroy();
        };
    }, [totalStudent]);

    const renderDashboardCard = (title, value, icon, iconColor) => (
        <Col xs={24} sm={12} md={6} lg={6}>
            <DashBoardCard icon={icon} title={title} value={value} iconColor={iconColor} />
        </Col>
    );

    return (
        <div>
            <div>
                <Row gutter={[16, 16]}>
                    {renderDashboardCard('Total Student', totalStudent?.data?.length, <UserOutlined />, 'green')}
                    {renderDashboardCard('Total Lecturer', totalLecturer?.data?.length, <SolutionOutlined />, 'blue')}
                    {renderDashboardCard('Total Faculty', facultyData?.data?.length || 0, <TeamOutlined />, 'orange')}
                    {renderDashboardCard('Total Class', totalClass?.data?.length, <PartitionOutlined />, 'purple')}
                </Row>
            </div>
            <div className="pt-3">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <Card style={{ height: '100%' }}>
                            <h5 style={{ textAlign: 'center' }}>Biểu đồ barChart thống kê sinh viên các khoa</h5>
                            <canvas id="barChart" ref={barChartRef}></canvas>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <Card style={{ height: '100%' }}>
                            <h5 style={{ textAlign: 'center' }}>Biểu đồ pie Chart đánh giá điểm</h5>
                            <canvas id="pieChart" ref={pieChartRef} style={{ margin: '0 auto' }}></canvas>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

function DashBoardCard({ title, value, icon, iconColor }) {
    const iconStyle = {
        color: iconColor,
        borderRadius: 20,
        fontSize: 36,
        padding: 12,
        marginRight: '32px',
    };

    return (
        <div
            style={{
                padding: '36px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {React.cloneElement(icon, { style: iconStyle })}
                <Statistic title={title} value={value} />
            </div>
        </div>
    );
}

export default Home;
