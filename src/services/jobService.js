const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getJobs = async () => {
  const res = await fetch(`${BASE_URL}/jobs`);

  if (!res.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return res.json();
};

const getJobById = async (jobId) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch job');
  }

  return res.json();
};

const createJob = async (formData) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Failed to create job');
  }

  return data;
};

const updateJob = async (jobId, formData) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Failed to update job');
  }

  return data;
};

const deleteJob = async (jobId) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || 'Failed to delete job');
  }
};

export { getJobs, getJobById, createJob, updateJob, deleteJob };