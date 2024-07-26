import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div>
            <Link to={"/user"}>Go to user Page</Link>
        </div>
      Home
    </div>
  )
}

export default Home
