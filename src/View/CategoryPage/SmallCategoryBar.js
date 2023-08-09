// SmallCategoryBar
import React from 'react';
import styled from 'styled-components';

const SmallCategory = styled.div`
    flex-shrink: 0;
    margin: 0 10px;
    
    color: ${props => props.selected ? "black" : "gray"};
    cursor: pointer;
    font-weight:${props => props.selected ? "800" : "0"};
`;

function SmallCategoryBar({ children, selected, onClick }) {
    return (
        <SmallCategory
            selected={selected}
            onClick={onClick}
        >
            {children}
        </SmallCategory>
    );
}

export default SmallCategoryBar;