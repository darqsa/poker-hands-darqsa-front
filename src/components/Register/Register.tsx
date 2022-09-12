import { SyntheticEvent, useState } from "react";
import useUserApi from "../../features/users/hooks/useUserApi";
import ButtonStyled from "../../styles/components/ButtonStyled";
import FormStyled from "../../styles/components/FormStyled";
import { useAppDispatch } from "../../app/hooks";
import { openAlertActionCreator } from "../../features/ui/slices/uiSlice";

const Register = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const initialState = {
    username: "",
    password: "",
    repeatPassword: "",
  };

  const { register, login } = useUserApi();
  const [formData, setFormData] = useState(initialState);
  const [fieldStatus, setFieldStatus] = useState("");
  const [usernameFieldStatus, setUsernameFieldStatus] = useState("");

  const onSubmitData = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      setFieldStatus("form__input--wrong");

      setFormData({
        username: formData.username,
        password: initialState.password,
        repeatPassword: initialState.repeatPassword,
      });
    } else {
      try {
        await register({
          username: formData.username,
          password: formData.password,
        });

        setFormData(initialState);
        await login({
          username: formData.username,
          password: formData.password,
        });
        dispatch(
          openAlertActionCreator(
            `Your account has been created successfully! 👍`
          )
        );
      } catch (error) {
        setUsernameFieldStatus("form__input--wrong");
      }
    }
  };

  const onChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldStatus("");
    setUsernameFieldStatus("");
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const hasEmptyFields =
    formData.username.length < 5 ||
    formData.password.length < 5 ||
    formData.repeatPassword.length < 5;

  return (
    <FormStyled onSubmit={onSubmitData} className="form">
      <h2 className="form__heading">Create your account</h2>
      <div className="form__group">
        <label className="form__label" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          className={`form__input ${usernameFieldStatus}`}
          autoComplete="off"
          placeholder="Enter your username"
          required
          onChange={onChangeData}
          value={formData.username}
        />
        {usernameFieldStatus && (
          <span className="form__wrong-password">Username already taken</span>
        )}
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className={`form__input ${fieldStatus || usernameFieldStatus} `}
          type="password"
          placeholder="Enter your password"
          autoComplete="off"
          required
          onChange={onChangeData}
          value={formData.password}
        />
        {fieldStatus && (
          <span className="form__wrong-password">
            Your passwords doesn't match
          </span>
        )}
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="repeatPassword">
          Repeat password
        </label>
        <input
          id="repeatPassword"
          className={`form__input ${fieldStatus || usernameFieldStatus}`}
          type="password"
          autoComplete="off"
          placeholder="Repeat your password"
          required
          onChange={onChangeData}
          value={formData.repeatPassword}
        />
      </div>
      <ButtonStyled
        className="form__button"
        type="submit"
        disabled={hasEmptyFields}
      >
        Register
      </ButtonStyled>
    </FormStyled>
  );
};
export default Register;
