import {Link} from "react-router-dom";
import React from "react";
import {isPresent} from "./helpers/helper";

const Decisions = ({ decisions }) =>
  <div>
    {isPresent(decisions) && (
      <div className='mb-3'>
        <h4 className='mt-3 text-center'>Decisions</h4>
        {decisions.map((decision, index) => {
          const {description, decision_url} = decision.attributes
          return <div
            className='card py-1 px-3 m-2 mx-auto'
            style={{ borderRadius: 8 }}
            key={index}
          >
            <div className='text-start truncated p-1'>
              <span>Your decision has been started!&nbsp;</span>
              <Link style={{ textDecoration: 'none' }}
                    to={decision_url} target='_blank' rel='noopener noreferrer'>
                {description}
              </Link>
            </div>
          </div>
        })}
      </div>
    )}
  </div>

export default Decisions