import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "./API";
import "./LogEntryForm.css";

function LogEntryForm({ location, onClose }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      onClose();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <form className="logEntryForm" onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="apiKey">API KEY</label>
      <input type="password" name="apiKey" ref={register} required />
      <label htmlFor="title">כותרת</label>
      <input type="text" name="title" ref={register} required />
      <label htmlFor="description">תיאור</label>
      <textarea
        type="text"
        name="description"
        ref={register}
        rows={3}
      ></textarea>
      <label htmlFor="comments">הערות</label>
      <textarea type="text" name="comments" ref={register} rows={3}></textarea>
      <label htmlFor="image">תמונה</label>
      <input name="image" ref={register} />
      <label htmlFor="visitDate">תאריך ביקור</label>
      <input type="date" name="visitDate" ref={register} required />
      <button disabled={loading}>{loading ? "טוען" : "צור"}</button>
    </form>
  );
}

export default LogEntryForm;
