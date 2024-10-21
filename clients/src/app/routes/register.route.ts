type RegisterData = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  address?: string;
};

export default async function POST(body: RegisterData) {
  const response = await fetch('http://localhost:3001/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify({ ...body }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
