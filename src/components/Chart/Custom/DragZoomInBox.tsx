import styled from 'styled-components';
import React from 'react';

interface DragZoomInBoxProps {
    dragBoxData: {
        left: 'unset' | number;
        right: 'unset' | number;
        top: number;
        width: number;
        height: number;
    };
}

const DragZoomInBox = ({dragBoxData}: DragZoomInBoxProps) => {
    const {left, right, top, width, height} = dragBoxData;
    return (
        <StyledDragZoomInBox
            style={{
                left: `${left === 'unset' ? 'unset' : `${dragBoxData.left}px`}`,
                right: `${right === 'unset' ? 'unset' : `${dragBoxData.right}px`}`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            <span>Zoom in 🔍</span>
        </StyledDragZoomInBox>
    );
};

export default DragZoomInBox;

const StyledDragZoomInBox = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: end;
    z-index: 999;
    position: absolute;
    border: 1px solid ${props => props.theme.zoomInBoxBorder};
    border-radius: 4px;
    background-color: ${props => props.theme.zoomInBoxBg};
    span {
        margin: 4px 16px 0px 0px;
        font-weight: 600;
        color: ${props => props.theme.zoomInLabel};
    }
`;
