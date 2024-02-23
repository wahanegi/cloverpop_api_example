import axios from "axios";

const INIT_DATA_URL = '/init_data'
const CREATE_DECISION_URL = '/create_decision'

const createCsrfToken = () => {
  const csrfToken = document.querySelector('[name=csrf-token]').content
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
}

export const getInitDataRequest = (setTemplates, setUsers, setOrg, setError, setLoaded) => {
  axios.get(INIT_DATA_URL)
    .then(response => {
      const {templates, users, org, error} = response.data.data
      setTemplates(templates)
      setUsers(users)
      setOrg(org)
      setError(error)
      setLoaded(true)
    })
    .catch(error => {console.error('Error:', error);});
}

export const createDecisionRequest = (decision, setDecisions, setLoaded, setDecision, setError,
                                      setSelectedTemplate, setSelectedUser, setSelectedCollaborators) =>
{
  createCsrfToken()
  setLoaded(false)

  axios.post(CREATE_DECISION_URL, { decision })
    .then(response => {
      const {decision, error} = response.data.data
      setDecisions(prev => [decision, ...prev])
      setError(error)
      setDecision({})
      setSelectedUser([])
      setSelectedTemplate([])
      setSelectedCollaborators([])
      setLoaded(true)
    })
    .catch(error => {
      console.error('Error:', error);
      setError(error)
      setSelectedUser([])
      setSelectedTemplate([])
      setSelectedCollaborators([])
      setLoaded(true)
    });
};