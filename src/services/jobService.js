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

export { getJobs, getJobById };