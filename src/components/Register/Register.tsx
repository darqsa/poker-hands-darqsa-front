import { SyntheticEvent, useState } from "react";
import useUserApi from "../../features/users/hooks/useUserApi";
import { Button, FormGroup, FormLabel, TextField } from "@mui/material";

const Register = (): JSX.Element => {
  const initialState = {
    username: "",
    password: "",
    repeatPassword: "",
  };

  const { register } = useUserApi();
  const [formData, setFormData] = useState(initialState);
  const [fieldStatus, setFieldStatus] = useState(false);

  const onSubmitData = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      setFieldStatus(true);
    } else {
      register({ username: formData.username, password: formData.password });
    }

    setFormData(initialState);
  };

  const onChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldStatus(false);
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const hasEmptyFields =
    formData.username.length < 5 ||
    formData.password.length < 5 ||
    formData.repeatPassword.length < 5;

  return (
    <form onSubmit={onSubmitData} className="form">
      <FormLabel className="form__heading">Create your account:</FormLabel>
      <FormGroup>
        <TextField
          id="username"
          className="form__input"
          label="Username"
          variant="outlined"
          autoComplete="off"
          placeholder="min 5 characters"
          required
          onChange={onChangeData}
          value={formData.username}
        />
        <TextField
          id="password"
          className="form__input"
          label="Password"
          variant="outlined"
          type="password"
          placeholder="min 5 characters"
          autoComplete="off"
          required
          onChange={onChangeData}
          error={fieldStatus}
          value={formData.password}
        />
        <TextField
          id="repeatPassword"
          className="form__input"
          label="Repeat password"
          variant="outlined"
          type="password"
          autoComplete="off"
          required
          onChange={onChangeData}
          error={fieldStatus}
          value={formData.repeatPassword}
        />

        <Button variant="contained" type="submit" disabled={hasEmptyFields}>
          Register
        </Button>
      </FormGroup>
    </form>
  );
};
export default Register;
