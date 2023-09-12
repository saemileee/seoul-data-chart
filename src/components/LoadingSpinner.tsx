import styled from 'styled-components';

const LoadingSpinner = () => {
    return (
        <LoadingSpinnerStyled className='loading'>
            <div className='spinner' />
            <div className='back' />
        </LoadingSpinnerStyled>
    );
};

export default LoadingSpinner;

const LoadingSpinnerStyled = styled.div`
    margin-top: 140px;
    margin-bottom: 140px;

    .loading {
        width: 100%;
        height: 50px;
    }

    .spinner {
        margin: auto;
        width: 132px;
        height: 132px;
        border-radius: 50%;
        border: 8px solid transparent;
        border-top-color: #038aff93;
        border-right-color: #038aff93;
        border-bottom-color: #038aff93;
        animation: spinner 0.8s ease infinite;
    }

    @keyframes spinner {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
