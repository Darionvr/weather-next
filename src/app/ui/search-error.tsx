
export const SearchError = ({ error }: { error?: string[] }) => {

    if (!error) return null

    return (
       error.map((err, index) => (
        <div key={index} >
            {err}
        </div>
       ))
    )
}
