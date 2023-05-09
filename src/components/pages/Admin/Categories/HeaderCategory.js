import React from 'react'
import Button from 'react-bootstrap/Button';

export function HeaderCategory(props) {
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

                {/* {btnTitle &&
                    <Button variant="success me-2" onClick={btnClick}>
                        {btnTitle}
                    </Button>
                }
                {btnTitle2 &&
                    <Button variant="success" onClick={btnClick2}>
                        {btnTitle2}
                    </Button>
                } */}
            </h4>
        </>
    )
}
