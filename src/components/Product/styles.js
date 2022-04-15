import styled from "styled-components";

import media from "../../assets/mediaQueries";

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 25px 15px;
    background: ${({theme}) => theme.defaultColors.first};

    @media screen and (min-width: ${media.default}) {
        align-items: center;

        img {
            max-width: 700px;
        }
    }
`;

export const Property = styled.div`
    margin: 0 auto;
    text-align: center;

    p {
        margin: 10px;
    }
`;

export const Description = styled.section`
    display: flex;
    justify-content: center;
    background: ${({theme}) => theme.defaultColors.first};
`;

export const ContentDescription = styled.div`
    max-width: fit-content;
    padding: 30px 20px;
    margin: 20px 0px;
    text-align: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: ${({theme}) => theme.gradient};

    h1 {
        margin-bottom: 20px;
    }

    p {
        max-width: 800px;
    }
`;
