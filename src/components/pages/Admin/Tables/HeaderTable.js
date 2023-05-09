import React from 'react'
import Button from 'react-bootstrap/Button';

export function HeaderTable(props) {
    const { title, btnTitle, btnClick } = props

    return (
        <>
            <h1>{title}</h1>
            <h4>
                {btnTitle &&
                    <Button variant="success" onClick={btnClick}>
                        {btnTitle}
                    </Button>
                }
            </h4>
        </>
    )
}
