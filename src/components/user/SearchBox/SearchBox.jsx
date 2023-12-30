import Search from "antd/es/input/Search";


function SearchBox(props) {
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    return (
        <>
            <Search placeholder="Search..." onSearch={onSearch} enterButton />
        </>
    )
}
export default SearchBox;