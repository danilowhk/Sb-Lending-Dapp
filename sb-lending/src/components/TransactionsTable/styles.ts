import styled from "styled-components";

export const Container = styled.div`
    margin-top:4rem;
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    /* padding-right: 1rem; */


    table{
        width: 100%;
        border-spacing: 0 0.5rem;

        th{
            color: var(--text-body);
            font-weight:400;
            padding: 1rem 2rem;
            text-align:left;
            line-height: 1.5rem;
        }

        td{
            padding: 1rem 2rem;
            border: 0;
            background: var(--shape);
            color: var(--text-body);
            border-radius: 0.25rem;
        }
        .title{
            color:var(--text-title);
        }
        .deposit{
            color:var(--red);

        }
        .withdraw{
            color:var(--green);
        }

    }

`
