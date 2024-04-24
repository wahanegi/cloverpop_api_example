import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import Loader from "./Loader";
import {isBlank, isPresent} from "./helpers/helper";
import {Button} from "react-bootstrap";
import Decisions from "./Decisions";
import {Typeahead} from "react-bootstrap-typeahead";
import {createDecisionRequest, getInitDataRequest} from "./helpers/requests";

export const BtnPrimary = ({ text, hidden, onClick, disabled }) =>
  <Button onClick={onClick} style={{backgroundColor: '#6A1B9A', border: 'none'}} hidden={hidden} disabled={disabled}>
    {text}
  </Button>

const DecisionsPage = () => {
  const [templates, setTemplates] = useState([])
  const [users, setUsers] = useState([])
  const [decisions, setDecisions] = useState([])
  const [decision, setDecision] = useState({attributes: {}, relationships: {}, type: 'Decision' })
  const [orgName, setOrgName] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState([]);
  const [selectedManager, setSelectedManager] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  const onChangeDecision = (e) => {
    setDecision(Object.assign({}, decision, { attributes: {[e.target.name]: e.target.value} }))
  }

  useEffect(() => {
    setDecision(Object.assign({}, decision, {
      type: 'Decision',
      relationships: {
        template: {
          data: { type: "template", id: selectedTemplate[0]?.id }
        },
        user: {
          data: { type: "org_user", id: selectedManager[0]?.id }
        },
        collaborators: selectedCollaborators.map(user => {
          return {
            data: { type: "org_user", id: user.id }
          }
        })
      }
    }))
  }, [selectedTemplate, selectedManager, selectedCollaborators])

  useEffect(() => {
    getInitDataRequest(setTemplates, setUsers, setOrgName, setError, setLoaded)
  }, []);

  if(!loaded) return <Loader />
  if(isPresent(error)) return <p>Error: {error}</p>

  return loaded && <div className="container mt-5">
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-md-8">
        <div>
          <h6 className='mb-2 text-start'>Current org: {orgName}</h6>
          <Form id="regForm">
            <h1 className='red-violet'>Cloverpop Decisions Api</h1>
            <Form.Group className='mb-2 text-start'>
              <Form.Label className='fs-6 mb-0'>Decision description</Form.Label>
              <Form.Control
                type="text" maxLength={100}
                placeholder="Add description"
                name="description"
                value = {decision.attributes?.description || ''}
                onChange={onChangeDecision}
              />
            </Form.Group>

            <Form.Group className='mb-2 text-start'>
              <Form.Label className='fs-6 mb-0'>Base template</Form.Label>
              <Typeahead
                id="typeahead-template"
                labelKey={option => option?.attributes?.description}
                onChange={setSelectedTemplate}
                options={templates || []}
                placeholder="Select a template..."
                selected={selectedTemplate}
              />
            </Form.Group>

            <Form.Group className='mb-3 text-start'>
              <Form.Label className='fs-6 mb-0'>Decision manager</Form.Label>
              <Typeahead
                id="typeahead-users"
                labelKey={user => `${user.attributes.name}`}
                onChange={setSelectedManager}
                options={users || []}
                placeholder="Select a user..."
                selected={selectedManager}
              />
            </Form.Group>

            <Form.Group className='mb-3 text-start'>
              <Form.Label className='fs-6 mb-0'>Collaborators of decision</Form.Label>
              <Typeahead
                id="typeahead-collaborators"
                multiple
                labelKey={user => `${user.attributes.name}`}
                onChange={setSelectedCollaborators}
                options={users || []}
                placeholder="Select collaborators of decision..."
                selected={selectedCollaborators}
              />
            </Form.Group>

            <div className='mt-3 text-end'>
              <BtnPrimary text='Create Decision'
                          disabled={isBlank(decision.attributes?.description) || isBlank(decision.relationships.template.data.id) || isBlank(decision.relationships.user.data.id)}
                          onClick={() => createDecisionRequest(
                            decision, setDecisions, setLoaded, setDecision, setError,
                            setSelectedTemplate, setSelectedManager, setSelectedCollaborators
                          )} />
            </div>
          </Form>
        </div>
        <Decisions decisions={decisions} />
      </div>
    </div>
  </div>
};

export default DecisionsPage;
