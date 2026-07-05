import { get } from './helpers/ApiRequestsHelper'

function getAll() {
  return get('commissions')
}

export { getAll }
