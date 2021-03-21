import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Form, Button } from "react-bootstrap"


function SearchBar(props) {
    const [search, setSearch] = useState("")
    const history = useHistory()
    function handleChange(e) {
        setSearch(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        history.push(`/search-${search}`)
    }
    return (
        <div>
            <Form onSubmit={handleSubmit} className={"d-flex " + props.styleClass}>
                <Form.Control required value={search} onChange={handleChange}
                    placeholder={"Search a Movie"} ></Form.Control>
                <Button variant="info" className="searchButton d-flex " type="submit"  > Search
                </Button>

            </Form>

        </div>

    )
}

export default SearchBar
