const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getMyApplications = async () => {
  const res = await fetch(`${BASE_URL}/applications/my`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch applications');
  }

  return res.json();
};

const createApplication = async (formData) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Failed to apply');
  }

  return data;
};

const getJobApplications = async (jobId) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}/applications`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch job applications');
  }

  return res.json();
};

const getCompanyApplications = async () => {
  const res = await fetch(`${BASE_URL}/applications/company`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch company applications');
  }

  return res.json();
};

const updateApplicationStatus = async (applicationId, status) => {
  const res = await fetch(`${BASE_URL}/applications/${applicationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Failed to update application');
  }

  return data;
};

export {
  getMyApplications,
  createApplication,
  getJobApplications,
  getCompanyApplications,
  updateApplicationStatus
};