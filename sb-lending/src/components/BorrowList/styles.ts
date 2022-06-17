import styled from 'styled-components';


export const Container = styled.div`

    margin-top: 2rem;
    color: var(--text-title);
    font-weight: 600;

    h1{
        margin-bottom:1.5rem;
    }

    span{
        display: flex;
        justify-content: space-between;
        /* align-items:center; */
        background:white;
        margin: 0;
        padding: 0.5rem;
        padding-left: 1.5rem;
        padding-right: 9rem;
        margin-bottom:0.5rem;
        font-size: 21px;


    }



    div{
        display: flex;
        justify-content: space-between;
        align-items:center;
        background:white;
        margin-top:0.5rem;
        margin: 0;
        padding: 1.5rem 2rem;
        /* border-radius: 0.25rem; */
        /* border-top: 1px solid light-gray; */
        font-size: 21px;
        /* text-align:center; */
        

        p{
            /* text-align:left; */
        }
        
        


        button{
            padding:0.5rem 1rem;
            border-radius: 0.25rem;
            border:0;
            font-weight: 600;

        }

        & + div{
            margin-top:0.5rem;
        }
      
    }



`
