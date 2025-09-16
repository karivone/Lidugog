<template>
  <section class="subscribe-section">
  <h1 class="subscribe-title">Join the Conversations</h1>
    <p class="subtitle">Get the content you need, just when you need it</p>
    <form class="subscribe-form" @submit.prevent="subscribe">
      <div class="form-row">
        <input v-model="firstName" type="text" placeholder="First Name*" required />
        <input v-model="lastName" type="text" placeholder="Last Name*" required />
      </div>
      <input v-model="email" type="email" placeholder="Email*" required />
      <div class="checkbox-row">
        <input v-model="agree" type="checkbox" id="agree" required />
        <label for="agree">Yes, subscribe me to your newsletter.*</label>
      </div>
      <button type="submit">Subscribe</button>
    </form>
    <p v-if="message" class="success-msg">{{ message }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const agree = ref(false)
const message = ref('')
async function subscribe() {
  if (!firstName.value || !lastName.value || !email.value || !agree.value) {
    message.value = 'Please fill all fields and agree to subscribe.'
    return
  }
  try {
    const res = await fetch('http://localhost:4000/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value
      })
    })
    const data = await res.json()
    if (res.ok) {
      message.value = data.message
      firstName.value = ''
      lastName.value = ''
      email.value = ''
      agree.value = false
    } else {
      message.value = data.error || 'Subscription failed.'
    }
  } catch (e) {
    message.value = 'Network error. Please try again.'
  }
}
</script>
<style scoped>
.subscribe-section {
  width: 80vw;
  max-width: none;
  margin: 3rem 0;
  background: #fff;
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 2.5rem 4vw 2rem 4vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
.subscribe-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #222;
  text-align: left;
  margin-left: 0;
}
.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  text-align: center;
}
.subscribe-form {
  width: 100%;
  max-width: 920px;
  min-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 3rem 4vw;
  background: #f9f9f9;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.06);
}
.form-row {
  display: flex;
  gap: 1rem;
}
.subscribe-form input[type="text"],
.subscribe-form input[type="email"] {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.checkbox-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}
.subscribe-form button {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
}
.subscribe-form button:hover {
  background: #369e6f;
}
.success-msg {
  color: #42b983;
  margin-top: 1rem;
  text-align: center;
}
</style>
