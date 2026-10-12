import { useState } from "react";

function OrderPage() {
  const [form, setForm] = useState({ name: "", email: "", qty: 1 });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function validate(v) {
    const e = {};
    if (v.name.trim().length < 2) e.name = "Name too short";
    if (!/^[^@\s]+@[^\s]+\.[^@\s]+$/.test(v.email)) e.email = "Enter a valid email";
    if (Number(v.qty) < 1) e.qty = "Qty must be >= 1";
    return e;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) setDone(true);
  }

  if (done) return <p style={{ color: 'green' }}>Thanks, {form.name}! Order received.</p>;

  return (
    <div>
      <h2>Place an Order</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" style={{ marginBottom: '5px' }} />
        {errors.name && <span style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>{errors.name}</span>}

        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" style={{ marginBottom: '5px' }} />
        {errors.email && <span style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>{errors.email}</span>}

        <input name="qty" type="number" value={form.qty} onChange={handleChange} style={{ marginBottom: '5px' }} />
        {errors.qty && <span style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>{errors.qty}</span>}

        <button type="submit" style={{ marginTop: '10px' }}>Place order</button>
      </form>
    </div>
  );
}

export default OrderPage;