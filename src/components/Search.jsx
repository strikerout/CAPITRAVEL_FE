import React, { useState } from 'react'
import PrimaryButton from './Buttons/PrimaryButton'
import useExperiences from '../hooks/useExperience'

const Search = () => {
  const{loading, countries, findExperiences} = useExperiences();

  const[keywords, setKeywords] = useState("");
  const[country, setCounty] = useState("");
  const[startDate, setStartDate] = useState("");
  const[endDate, setEndDate] = useState("")


  const handleSubmit = (e) =>{
    e.preventDefault()
    findExperiences(country, keywords, startDate, endDate)
  }

  return (
    <div className='search'>
        <h4>Find the experiences you´re been looking for</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="plan">What´s Your Plan?</label>
            <input type="text" name="plan" id='plan' placeholder='Drink mate, surf,...'
            onChange={(e) =>
              setKeywords(e.target.value)
            }
            />
          </div>
          <div>
            <div className='labelContainer'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0a7.78 7.78 0 0 0 0 11.13L12 21.999l5.657-5.565a7.78 7.78 0 0 0 0-11.13M12 13.499c-.668 0-1.295-.26-1.768-.732a2.503 2.503 0 0 1 0-3.536c.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732a2.503 2.503 0 0 1 0 3.536c-.472.472-1.1.732-1.768.732"
                  />
              </svg>
              <label htmlFor="where">Where</label>
            </div>
            <select
                  id="where"
                  onChange={(e) =>
                    setCounty(e.target.value)
                  }
                >
                  <option value="">
                    Select destination
                  </option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
            </div>
            <div>
              <div className='labelContainer'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M2 9c0-1.886 0-2.828.586-3.414S4.114 5 6 5h12c1.886 0 2.828 0 3.414.586S22 7.114 22 9c0 .471 0 .707-.146.854C21.707 10 21.47 10 21 10H3c-.471 0-.707 0-.854-.146C2 9.707 2 9.47 2 9m0 9c0 1.886 0 2.828.586 3.414S4.114 22 6 22h12c1.886 0 2.828 0 3.414-.586S22 19.886 22 18v-5c0-.471 0-.707-.146-.854C21.707 12 21.47 12 21 12H3c-.471 0-.707 0-.854.146C2 12.293 2 12.53 2 13z"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 3v3m10-3v3"/></g></svg>
                <label htmlFor="CheckIn">Check In</label>
              </div>
              <input type="date" id='CheckIn' placeholder='Date'
               onChange={(e) =>
                setStartDate(e.target.value)
              }
              />
            </div>

            <div>
              <div className='labelContainer'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M2 9c0-1.886 0-2.828.586-3.414S4.114 5 6 5h12c1.886 0 2.828 0 3.414.586S22 7.114 22 9c0 .471 0 .707-.146.854C21.707 10 21.47 10 21 10H3c-.471 0-.707 0-.854-.146C2 9.707 2 9.47 2 9m0 9c0 1.886 0 2.828.586 3.414S4.114 22 6 22h12c1.886 0 2.828 0 3.414-.586S22 19.886 22 18v-5c0-.471 0-.707-.146-.854C21.707 12 21.47 12 21 12H3c-.471 0-.707 0-.854.146C2 12.293 2 12.53 2 13z"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 3v3m10-3v3"/></g></svg>
                <label htmlFor="CheckOut">Check Out</label>
              </div>
              <input type="date" id='CheckOut' placeholder='Date'
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
              />
            </div>
            
            <PrimaryButton type='submit'>Search</PrimaryButton>
        </form>
      
    </div>
  )
}

export default Search
