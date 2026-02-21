import { useState, useCallback, useMemo } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input } from "@/shared/ui";
import { ROUTES } from "@/shared/config/routes";
import { useLoginMutation } from "../../api/authApi";
import { setCredentials } from "../../model/authSlice";
import "./LoginForm.css";

interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

export function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!username.trim()) {
      newErrors.username = t("auth.errors.usernameRequired");
    }
    if (!password.trim()) {
      newErrors.password = t("auth.errors.passwordRequired");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [username, password, t]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      try {
        const result = await login({ username, password }).unwrap();
        const { accessToken, ...user } = result;
        dispatch(setCredentials({ user, token: accessToken }));
        navigate(ROUTES.DASHBOARD);
      } catch {
        setErrors({ general: t("auth.errors.loginFailed") });
      }
    },
    [username, password, validate, login, dispatch, navigate, t],
  );

  const hint = useMemo(
    () => (
      <p className="login-form__hint">
        Demo: <strong>artemtk</strong> / <strong>arttka237</strong>
      </p>
    ),
    [],
  );

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="login-form__title">{t("auth.title")}</h1>

      {errors.general && (
        <div className="login-form__error">{errors.general}</div>
      )}

      <Input
        label={t("auth.username")}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
        autoComplete="username"
        placeholder="artemtk"
      />

      <Input
        label={t("auth.password")}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete="current-password"
        placeholder="arttka237"
      />

      <Button type="submit" isLoading={isLoading} size="lg">
        {t("auth.loginButton")}
      </Button>

      {hint}

      <p className="login-form__link">
        <Link to={ROUTES.REGISTER}>{t("auth.registerLink")}</Link>
      </p>
    </form>
  );
}
