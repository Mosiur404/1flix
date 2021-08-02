import React from "react";
import { Form } from "../../Forms/Form/Form";
import { InputBox } from "../../Forms/InputBox";
import { ButtonPrimary } from "../../UI/Button/Button";
import Select from "react-select";
import style from "./EditMovie.module.scss";

export default function EditMovie() {
  let formIsValid = false;
  const formSubmitHandler = (params) => {};

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <Form onSubmit={formSubmitHandler} className={style.editMovieForm}>
      <div className="row">
        <div className="col-lg-5">
          <Select options={options} closeMenuOnSelect={false} isMulti={true} />
        </div>
        <div className="col-lg-7">
          <InputBox
            type="text"
            label="Movie title"
            id="movieTitle"
            placeholder="ID of the image"
            //   value={data.ID}
          />
          <InputBox
            type="textarea"
            label="Movie plot"
            id="moviePlot"
            placeholder="ID of the image"
            params={{ style: { height: "100px", borderRadius: "1rem" } }}
            value="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium obcaecati suscipit laudantium, aspernatur atque odit aliquid iusto reprehenderit alias consequatur nam fugit quod, mollitia ratione nostrum, delectus nulla possimus et?"
          />
          <InputBox
            type="number"
            label="Movie length"
            id="movieLength"
            placeholder="ID of the image"
          />
          <InputBox
            type="number"
            label="Movie release year"
            id="movieLength"
            placeholder="ID of the image"
          />

          <div className="h-flex">
            {/* <span>
            {loading && <Spinner />}
            {error && error.message}
          </span> */}
            <ButtonPrimary type="submit" isDisabled={!formIsValid}>
              SAVE
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </Form>
  );
}
