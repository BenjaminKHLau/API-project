import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { createNewReviewThunk } from "../../store/reviews";
import { getSpotByIdThunk } from "../../store/spots";


function CreateReviewFormComponent({closeModal}){
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const [errors, setErrors] = useState([])
    const { spotId } = useParams()

    console.log("use Params REVIEWS COMP",useParams())

    useEffect(() => {
        let errors = []
        if (review.length < 1) errors.push("Please enter a review")
        if (stars < 1 || stars > 5) errors.push("Please give a rating between 1 - 5")
        setErrors(errors)
      },[review, stars, errors])


    async function subby(e){
        e.preventDefault()
        console.log({
            review, stars, spotId
          })
          await dispatch(createNewReviewThunk(
            review, stars, spotId
          ))
          await dispatch(getSpotByIdThunk(spotId))
          closeModal()
        // history.push("/spo")
      }

      const showErrors = errors.map(error => (
        <li className="error-message" key={error}>{error}</li>
      ))


return (
    <>
    <form
          className="spot-form"
          onSubmit={subby}
        >
          <h2 className="title">Create a Review</h2>
          <ul className="errors">
            {showErrors}
          </ul>
          
          <div className="form-css">

          
          <label className="form-stuff">
            <input className="form-input"
              type="number"
              min={1}
              max={5}
              name="stars"
              placeholder="Stars"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              />
          </label>

          <label className="form-stuff">
            <input className="form-input"
              type="review"
              name="review"
              placeholder="Write your Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              />
          </label>

        <div className="submit">

          <button
            type="submit"
            disabled={errors.length > 0}
            className="submit-button"
            >
            Create Review
          </button>

              </div>
            </div>
        </form>
    </>
)

}
export default CreateReviewFormComponent