import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
function SearchBar(props) {
    const [search, setSearch] = useState("")
    function handleChange(e) {
        setSearch(e.target.value)
    }
    return (
        <div>
            <Form className={"d-flex " + props.styleClass}>
                <Form.Control value={search} onChange={handleChange}
                    placeholder={"Search a Movie"} ></Form.Control>
                <Link replace to={`/search-${search}`} >
                    <Button variant="info" className="searchButton d-flex " type="submit"  >
                        Search
                    </Button>
                </Link>

            </Form>

        </div >

    )
}

export default SearchBar
