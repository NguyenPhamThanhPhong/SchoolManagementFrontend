import React, { useEffect, useRef } from 'react';
import { SolutionOutlined, TeamOutlined, UserOutlined, PartitionOutlined } from '@ant-design/icons';
import { Card, Statistic, Row, Col } from 'antd';
import Chart from 'chart.js/auto';
import './Home.scss';

import { useUserContext } from '../../../data-store';

function Home() {
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const lineChartRef = useRef(null);

    useEffect(() => {
        // Biểu đồ barChart
        const barCtx = barChartRef.current.getContext('2d');
        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Faculty 1', 'Faculty 2', 'Faculty 3', 'Faculty 4', 'Faculty 5', 'Faculty 6'],
                datasets: [
                    {
                        label: '# of Votes',
                        barPercentage: 0.7,
                        barThickness: 60,
                        data: [10, 20, 30, 40, 50, 60],
                        backgroundColor: 'blue',
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        // Biểu đồ pie Chart
        const pieCtx = pieChartRef.current.getContext('2d');
        const pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['<5', '5-7', '7-8', '8-9', '>9'],
                datasets: [
                    {
                        data: [12, 19, 3, 5, 2],
                        backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple'],
                    },
                ],
            },
        });

        // Biểu đồ line Chart
        const lineCtx = lineChartRef.current.getContext('2d');
        const lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023'],
                datasets: [
                    {
                        label: 'Data',
                        data: [12, 19, 3, 5, 2],
                        borderColor: 'green',
                        backgroundColor: 'green',
                    },
                ],
            },
        });

        // Hủy biểu đồ khi component unmount
        return () => {
            barChart.destroy();
            pieChart.destroy();
            lineChart.destroy();
        };
    }, []);

    const renderDashboardCard = (title, value, icon, iconColor) => (
        <Col xs={24} sm={12} md={6} lg={6}>
            <DashBoardCard icon={icon} title={title} value={value} iconColor={iconColor} />
        </Col>
    );

    return (
        <div>
            <div>
                <Row gutter={[16, 16]}>
                    {renderDashboardCard('Total Student', 100000, <UserOutlined />, 'green')}
                    {renderDashboardCard('Total Lecturer', 50000, <SolutionOutlined />, 'blue')}
                    {renderDashboardCard('Total Faculty', 200, <TeamOutlined />, 'orange')}
                    {renderDashboardCard('Total Class', 50, <PartitionOutlined />, 'purple')}
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
            <div>
                <Card style={{ height: '100%', marginTop: '16px' }}>
                    <h5 style={{ textAlign: 'center' }}>
                        Biểu đồ line Chart đánh giá số lượng sinh viên thôi học qua các năm
                    </h5>
                    <canvas id="lineChart" ref={lineChartRef}></canvas>
                </Card>
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
