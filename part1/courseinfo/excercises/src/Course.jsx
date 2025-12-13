const Course = (props) => {
    const {course} = props

    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part =>
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            )}
        </div>
        
    )
}

export default Course