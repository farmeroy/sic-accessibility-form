import Input from "./Input";
import useForm from "../hooks/useForm";
import { FormEvent } from "react";

const emailInputIsValid = (email: string) => {
  //https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript#46181
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};
const textInputIsValid = (text: string) => {
  return text.trim().length > 0;
};

const ContactForm = ({ sections }) => {
  const {
    enteredValue: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    inputTouchHandler: emailTouchHandler,
  } = useForm(emailInputIsValid);

  const {
    enteredValue: enteredName,
    hasError: nameHasError,
    isValid: nameIsValid,
    inputChangeHandler: nameChangeHandler,
    inputTouchHandler: nameTouchHandler,
  } = useForm(textInputIsValid);

  const {
    enteredValue: enteredMessage,
    hasError: messageHasError,
    isValid: messageIsValid,
    inputChangeHandler: messageChangeHandler,
    inputTouchHandler: messageTouchHandler,
  } = useForm(textInputIsValid);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!nameIsValid || !emailIsValid || !messageIsValid) return;
    console.log({ enteredName, enteredEmail, enteredMessage, sections });
  };

  const formIsInValid = messageHasError || nameHasError || emailHasError;

  return (
    <div className="flex flex-col w-full">
      <form onSubmit={(event) => handleSubmit(event)}>
        <Input
          type="text"
          label="Email"
          placeholder="email"
          value={enteredEmail}
          hasError={emailHasError}
          onChange={emailChangeHandler}
          onBlur={emailTouchHandler}
          errorMessage="Enter your email address"
        />
        <Input
          placeholder="Your Name"
          type="text"
          label="Name"
          value={enteredName}
          hasError={nameHasError}
          onChange={nameChangeHandler}
          onBlur={nameTouchHandler}
          errorMessage="Enter your name"
        />
        <Input
          type="textarea"
          placeholder="Send us a message"
          label="Message"
          value={enteredMessage}
          hasError={messageHasError}
          onChange={messageChangeHandler}
          onBlur={messageTouchHandler}
          errorMessage="Enter a message"
        />
        <div className="flex justify-between w-full py-2">
          <button
            disabled={formIsInValid}
            className={`w-full p-2 text-xl text-white  rounded-lg bg-accentBlue ${
              formIsInValid ? "bg-gray-400" : ""
            }`}
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
