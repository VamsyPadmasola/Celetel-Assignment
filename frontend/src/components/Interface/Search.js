import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { BiSearch } from "react-icons/bi"
const SearchBox = () => {

    const { search: queryString } = useLocation()

    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const queryParams = new URLSearchParams(search).get("search")
        setSearch(queryParams || "")
    }, [queryString])
    const handleInput = e => {
        setSearch(e.target.value)
    }

    const handleFormSubmission = e => {
        e.preventDefault()
        navigate({
            search: `search=${search}`,
        });
    }
    return (
        <>
            <form>
                <div className="p-4 w-full outline-none rounded-lg shadow-2xl bg-white flex space-x-3">
                    <button type="submit" >
                        <BiSearch size={20} />
                    </button>
                    <input name="search" type="text"
                        id="search"
                        placeholder="Search" className="outline-none" />
                </div>
            </form>
        </>
    )
}

export default SearchBox;