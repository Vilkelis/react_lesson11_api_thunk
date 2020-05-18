import { CHANGE_SERVICE_FIELD,
         FETCH_SERVICES_REQUEST,
         FETCH_SERVICES_SUCCESS,
         FETCH_SERVICES_FAILURE,
         REMOVE_SERVICE_REQUEST,
         REMOVE_SERVICE_SUCCESS,
         REMOVE_SERVICE_FAILURE,
         FETCH_SERVICE_REQUEST,
         FETCH_SERVICE_SUCCESS,
         FETCH_SERVICE_FAILURE,
         SAVE_SERVICE_REQUEST,
         SAVE_SERVICE_SUCCESS,
         SAVE_SERVICE_FAILURE         
        } from './actionTypes';

export function changeServiceField(name, value) {
  return {type: CHANGE_SERVICE_FIELD, payload: {name, value}}
}

export function fetchServicesRequest() {
  return {type: FETCH_SERVICES_REQUEST};
}

export function fetchServicesSuccess(items) {
  return {type: FETCH_SERVICES_SUCCESS, payload: items};
}

export function fetchServicesFailure(error) {
  return {type: FETCH_SERVICES_FAILURE, payload: {error}};
}

export function removeServiceRequest(id) {
  return {type: REMOVE_SERVICE_REQUEST, payload: id};
}

export function removeServiceSuccess(id) {
  return {type: REMOVE_SERVICE_SUCCESS, payload: id};
}

export function removeServiceFailure(id, error) {
  return {type: REMOVE_SERVICE_FAILURE, payload: {id, error}};
}

export function fetchServiceRequest(id) {
  return {type: FETCH_SERVICE_REQUEST, payload: id}
}

export function fetchServiceSuccess(item) {
  return {type: FETCH_SERVICE_SUCCESS, payload: item}
}

export function fetchServiceFailure(id, error) {
  return {type: FETCH_SERVICE_FAILURE, payload: {id, error}}
}

export function saveServiceRequest(item) {
  return {type: SAVE_SERVICE_REQUEST, payload: item}
}

export function saveServiceSuccess(item) {
  return {type: SAVE_SERVICE_SUCCESS, payload: item}
}

export function saveServiceFailure(id, error) {
  return {type: SAVE_SERVICE_FAILURE, payload: {id, error}} 
}