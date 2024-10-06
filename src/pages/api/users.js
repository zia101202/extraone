let users = []; // In-memory array to store users (name and email)

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Add user (name and email) to the array
    const { name, email } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    // Add user to the array
    users.push({ name, email });
    return res.status(201).json({ message: 'User added successfully!' });
  } else if (req.method === 'GET') {
    // Return the list of users
    return res.status(200).json(users);
  } else {
    // Handle any other HTTP method
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
