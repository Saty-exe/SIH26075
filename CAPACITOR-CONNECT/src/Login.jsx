import { useState } from "react";
import { useForm } from "react-hook-form";

function TraineeForm() {
  const [submittedTrainee, setSubmittedTrainee] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    trigger,
    setError,
    clearErrors,
    formState: {
      errors,
      isSubmitting,
      isValid,
      isDirty,
    },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      qualification: "",
      experience: "",
    },
  });

  const name = watch("name");

  const onSubmit = (data) => {
    setSubmittedTrainee(data);
  };

  const handleSetName = () => {
    setValue("name", "Satyam");
  };

  const handleGetValues = () => {
    console.log(getValues());
  };

  const handleValidateEmail = async () => {
    await trigger("email");
  };

  const handleCustomError = () => {
    setError("name", {
      type: "manual",
      message: "This is a manually created error",
    });
  };

  const handleClearError = () => {
    clearErrors("name");
  };

  return (
    <div>
      <h1>Trainee Registration</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label>Name</label>

          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must contain at least 3 characters",
              },
            })}
          />

          {errors.name && (
            <p>{errors.name.message}</p>
          )}
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Qualification</label>

          <input
            {...register("qualification", {
              required: "Qualification is required",
            })}
          />

          {errors.qualification && (
            <p>{errors.qualification.message}</p>
          )}
        </div>

        <div>
          <label>Experience</label>

          <input
            type="number"
            {...register("experience")}
          />
        </div>

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Account"}
        </button>
      </form>

      <hr />

      <h2>Live Preview</h2>

      <p>Hello, {name || "Trainee"}</p>

      <hr />

      <h2>Practice Controls</h2>

      <button onClick={handleSetName}>
        Set Name
      </button>

      <button onClick={handleGetValues}>
        Get Values
      </button>

      <button onClick={handleValidateEmail}>
        Validate Email
      </button>

      <button onClick={handleCustomError}>
        Create Name Error
      </button>

      <button onClick={handleClearError}>
        Clear Name Error
      </button>

      <button onClick={() => reset()}>
        Reset Form
      </button>

      <hr />

      {submittedTrainee && (
        <div>
          <h2>Trainee Card</h2>

          <p>
            <strong>Name:</strong>{" "}
            {submittedTrainee.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {submittedTrainee.email}
          </p>

          <p>
            <strong>Qualification:</strong>{" "}
            {submittedTrainee.qualification}
          </p>

          <p>
            <strong>Experience:</strong>{" "}
            {submittedTrainee.experience} years
          </p>
        </div>
      )}

      <p>Form changed: {isDirty ? "Yes" : "No"}</p>
    </div>
  );
}

export default TraineeForm;