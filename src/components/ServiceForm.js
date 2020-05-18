import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeServiceField,
				fetchServiceSuccess, 
				fetchServiceRequest, 
				fetchServiceFailure,
				saveServiceSuccess,
				saveServiceRequest,
				saveServiceFailure
			 } from '../actions/actionCreators';
import Alert from './Alert';			 

const fetchService = async (id, dispatch) => {
	dispatch(fetchServiceRequest(id));
	try {
		const response = await fetch(process.env.REACT_APP_API_URL + '/' + id);
	  if (!response.ok) {
			throw new Error('Произошла ошибка!');
		} 		
		const service = await response.json();
		dispatch(fetchServiceSuccess(service));
	} catch (error) {
		dispatch(fetchServiceFailure(id, error.message));
	}      
};

const saveService = async (item, dispatch, callBack) => {
	item.id = Number(item.id);
	dispatch(saveServiceRequest(item.id));
	try {
		const response = await fetch( process.env.REACT_APP_API_URL, 
																	{ method: 'POST',
																		body: JSON.stringify(item),
																		headers: {
																			'Content-Type': 'application/json;charset=utf-8'
																		},
																	});  
	  if (!response.ok) {
			throw new Error('Произошла ошибка!');
		}   
		dispatch(saveServiceSuccess(item));     
		callBack && callBack();
	} catch (error) {
		dispatch(saveServiceFailure(item.id, error.message));
	}
}

function ServiceForm(props) {
	const {history, match} = props;
	const {item, errorLoading, errorSaving, loading, saving} = useSelector(state => state.serviceForm);
	const dispatch = useDispatch();

  React.useEffect( () => {
    fetchService(Number(match.params.id), dispatch);
  }, [dispatch, match.params.id]);

	const handleChange = evt => {
		const {name, value} = evt.target;
		dispatch(changeServiceField(name, value));
	}

	const handleCancel = evt => {
		evt.preventDefault();
		history.push('/services');
	}

	const handleSubmit = evt => {
		evt.preventDefault();
		saveService(item, dispatch, () => { history.push('/services')} );	
	}

  if (loading) {
    return <div className="loading-big"><img src="/loading_big.gif" alt="Loading..."/></div>
  }

  if (errorLoading) {
    return <Alert text={errorLoading} kind={"danger"}/>
  }

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="form-filed-name">Название</label>
				<input type="text" 
				       className="form-control" 
							 id="form-filed-name" 
							 name='name' 
							 onChange={handleChange} 
							 value={item.name} 
							 readOnly={saving} />
			</div>
			<div className="form-group">
				<label htmlFor="form-filed-price">Стоимость (руб.)</label>
				<input type="number"
							 className="form-control" 
							 id="form-filed-price" 
							 name='price' 
							 onChange={handleChange} 
							 value={item.price} 
							 readOnly={saving} />
			</div>
			<div className="form-group">
				<label htmlFor="form-filed-content">Описание</label>
				<input type="text"
							 className="form-control" 
							 id="form-filed-content" 
							 name='content' 
							 onChange={handleChange} 
							 value={item.content} 
							 readOnly={saving} />
			</div>
			<div className="form-group form-buttons" >
				<button className="btn btn-danger" onClick={handleCancel} disabled={saving}>
					Отмена
				</button>
				<button type='submit' className="btn btn-danger" disabled={saving} >
				  {saving ? <img className="action-img" src="/loading_small.gif" alt="Сохранение..."/>  : 'Сохранить'}  	 
				</button>            
      </div>
			{errorSaving && <Alert text={errorSaving} kind={"danger"}/>}
		</form>
	);
}

export default ServiceForm;
