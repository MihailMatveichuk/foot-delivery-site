type LoginData = {
  email: string;
  password: string;
};

export default async function POST(body: LoginData) {
  const { email, password } = body;

  const response = await fetch('http://localhost:3001/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
