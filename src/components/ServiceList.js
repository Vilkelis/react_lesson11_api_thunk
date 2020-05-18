import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Alert from './Alert';
import {useSelector, useDispatch} from 'react-redux';
import { fetchServicesSuccess, 
         fetchServicesRequest, 
         fetchServicesFailure,
         removeServiceSuccess,
         removeServiceRequest,
         removeServiceFailure
        } from '../actions/actionCreators';

const fetchServices = async (dispatch) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(process.env.REACT_APP_API_URL);
	  if (!response.ok) {
			throw new Error('Произошла ошибка!');
		}   
    const services = await response.json();
    dispatch(fetchServicesSuccess(services));
  } catch (error) {
    dispatch(fetchServicesFailure(error.message));
  }      
};

const removeService = async (id, dispatch) => {
  dispatch(removeServiceRequest(id));
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/' + id, { method: 'DELETE'});     
	  if (!response.ok) {
			throw new Error('Произошла ошибка!');
		}       
    dispatch(removeServiceSuccess(id));     
  } catch (error) {
    dispatch(removeServiceFailure(id, error.message));
  }
}

function ServiceList(props) {
  const {history} = props;
  const {items, error, loading} = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

  React.useEffect( () => {
    fetchServices(dispatch);
  }, [dispatch]);

  const handleRemove = id => {
    removeService(id, dispatch);
  }

  const handleEdit = id => {
    history.push( '/services/' + id);    
  }

  if (loading) {
    return <div className="loading-big"><img src="/loading_big.gif" alt="Loading..."/></div>
  }

  if (error) {
    return <Alert text={error} kind={"danger"}/>
  }

  return (         
    <ul className="list-group">
      {items.map(o => (
        <li className="list-group-item" key={o.id}>
          <div className="list-group-item__content">
          {o.name}: {o.price} руб.           
          <div className="list-group-item__buttons">
            <button className="btn btn-danger" disabled={o.removing} onClick={() => handleEdit(o.id)}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
            <button className="btn btn-danger" disabled={o.removing} onClick={() => handleRemove(o.id)}>
             {o.removing ? <img className="action-img" src="/loading_small.gif" alt="Удаление..."/>  : '✕'}  
            </button>            
          </div>
          </div>          
          {o.error && <Alert text={o.error} kind={"danger"}/>}
        </li>
      ))}
    </ul>
  )
}

export default ServiceList