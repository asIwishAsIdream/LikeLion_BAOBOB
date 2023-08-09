import React, { useState } from 'react';
import Dropdown from './Dropdown';
import styled from 'styled-components';

const SortingContainer = styled.div`
    position: absolute; // 고정 위치를 위해 absolute 또는 fixed를 사용
    left: 1312px; // 가로 위치
    top: 196px; // 세로 위치
    text-align: right;
    font-family: "'Apple SD Gothic Neo M', 'Noto Sans KR','Bagel Fat One',  sans-serif";

`

function SortingComponent({ initialData = [] }) {
    const [data, setData] = useState(initialData);
    const [sortOption, setSortOption] = useState('인기순');

    const sortOptions = ['인기순', '조회수', '좋아요', '평점', '최신 책', '오래된 책'];

    const sortData = option => {
        let sortedData;
        switch (option) {
            case '인기순':
                sortedData = data.sort((a, b) => b.popularity - a.popularity);
                break;
            case '조회수':
                sortedData = data.sort((a, b) => b.views - a.views);
                break;
            case '좋아요':
                sortedData = data.sort((a, b) => b.likes - a.likes);
                break;
            case '평점':
                sortedData = data.sort((a, b) => b.rating - a.rating);
                break;
            case '최신 책':
                sortedData = data.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
                break;
            case '오래된 책':
                sortedData = data.sort((a, b) => new Date(a.publishedDate) - new Date(b.publishedDate));
                break;
            default:
                sortedData = data;
        }
        setData(sortedData);
    };

    const handleSortOptionSelect = option => {
        setSortOption(option);
        // sortData(option);
    };

    return (
        <SortingContainer>
            <Dropdown options={sortOptions} selectedOption={sortOption} onOptionSelect={handleSortOptionSelect} />
            {/* Render sorted data */}
            {data.map(item => (
                <div key={item.id}>
                    {/* Render item properties */}
                </div>
            ))}
        </SortingContainer>
    );
}

export default SortingComponent;