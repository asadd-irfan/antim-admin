
import { AdminActionTypes, AdminActions } from '../actions/admin.actions';

export interface State {
  totalUnReadNotifications: any;
  totalUnReadMessages: any;
  AllCustomers: any[];
  AllCustomerRequests: any[];
  AllFunders: any[];
  AllFunderRequests: any[];
  DashboardData: any;

}

export const initialState: State = {
  totalUnReadNotifications: 0,
  totalUnReadMessages: 0,
  AllCustomers: [],
  AllCustomerRequests: [],
  AllFunders: [],
  AllFunderRequests: [],
  DashboardData: null
};

export function reducer(state = initialState, action: AdminActions): State {
  switch (action.type) {
    case AdminActionTypes.SAVE_ALL_CUSTOMERS: {
      return {
        ...state,
        AllCustomers: action.payload,
      };
    }
    // case AdminActionTypes.REMOVE_ALL_CUSTOMERS: {
    //   return {
    //     ...state,
    //     AllCustomers: [],
    //   };
    // }
    case AdminActionTypes.DELETE_CUSTOMER: {
      let deletedCustomer = state.AllCustomers.filter(
        item => item.id != action.payload.id);
      return {
        ...state,
        AllCustomers: deletedCustomer,
      };
    }
    case AdminActionTypes.CHANGE_CUSTOMER_STATUS: {
      let data = action.payload;
      let Editedcustomers = state.AllCustomers.map(item => {
        if (item.id == data.id) {
          let customer = Object.assign({}, item, {
            status: data.status
          })
          item = customer;
        }
        return item;
      });
      return {
        ...state,
        AllCustomers: Editedcustomers,
      };
    }

    case AdminActionTypes.SAVE_CUSTOMER_REQUESTS: {
      return {
        ...state,
        AllCustomerRequests: action.payload,
      };
    }
    case AdminActionTypes.CHANGE_CUSTOMER_REQUEST_TYPE: {
      let data = action.payload;
      let EditedCustomerRequests = state.AllCustomers.map(item => {
        if (item.id == data.id) {
          let customerRequest = Object.assign({}, item, {
            requestType: data.requestType
          })
          item = customerRequest;
        }
        return item;
      });
      return {
        ...state,
        AllCustomerRequests: EditedCustomerRequests,
      };
    }

    // case AdminActionTypes.REMOVE_CUSTOMER_REQUESTS: {
    //   return {
    //     ...state,
    //     AllCustomerRequests: [],
    //   };
    // }

    case AdminActionTypes.SAVE_ALL_FUNDERS: {
      return {
        ...state,
        AllFunders: action.payload,
      };
    }
    // case AdminActionTypes.REMOVE_ALL_FUNDERS: {
    //   return {
    //     ...state,
    //     AllFunders: [],
    //   };
    // }
    case AdminActionTypes.DELETE_FUNDER: {
      let deletedFunder = state.AllFunders.filter(
        item => item.id != action.payload.id);
      return {
        ...state,
        AllFunders: deletedFunder,
      };
    }
    case AdminActionTypes.CHANGE_FUNDER_STATUS: {
      let data = action.payload;
      let EditedFunders = state.AllFunders.map(item => {
        if (item.id == data.id) {
          let funder = Object.assign({}, item, {
            status: data.status
          })
          item = funder;
        }
        return item;
      });
      return {
        ...state,
        AllFunders: EditedFunders,
      };
    }

    case AdminActionTypes.SAVE_FUNDER_REQUESTS: {
      return {
        ...state,
        AllFunderRequests: action.payload,
      };
    }
    // case AdminActionTypes.CHANGE_FUNDER_REQUESTS_TYPE: {
    //   return {
    //     ...state,
    //     AllFunderRequests: [],
    //   };
    // }

    case AdminActionTypes.SAVE_TOTAL_NOTIFICATIONS: {
      return  {
        ...state,
        totalUnReadNotifications: action.payload,
      };
    }
    case AdminActionTypes.READ_NOTIFICATION: {
      return  {
        ...state,
        totalUnReadNotifications: state.totalUnReadNotifications - action.payload,
      };
    }
    case AdminActionTypes.ADD_NOTIFICATION: {
      return  {
        ...state,
        totalUnReadNotifications: action.payload,
      };
    }
    case AdminActionTypes.SAVE_TOTAL_MESSAGES: {
      return  {
        ...state,
        totalUnReadMessages: action.payload,
      };
    }
    case AdminActionTypes.READ_MESSAGE: {
      return  {
        ...state,
        totalUnReadMessages: state.totalUnReadMessages - action.payload,
      };
    }

    case AdminActionTypes.SAVE_DASHBOARD_DATA: {
      return {
        ...state,
        DashboardData: action.payload,
      };
    }
    case AdminActionTypes.REMOVE_DASHBOARD_DATA: {
      return {
        ...state,
        DashboardData: null,
      };
    }

    default: {
      return state;
    }
  }
}
