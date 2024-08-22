import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dashService from './dashService';

// Async thunk to fetch policies
export const getPolicies = createAsyncThunk(
  'dashboard/policies',
  async (user, thunkAPI) => {
    try {
      return await dashService.getPolicies(user);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Define initial state
const initialState = {
  handleMenu: false,
  policies: {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
  },
  purchase: {
    type: 'Assurance Digitale',
    company: '',
    cost: {value: null, isError: false},
    vehicle: {},
    owner: {},
  }
};

// Create the slice
export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.handleMenu = !state.handleMenu;
    },
    purchasePolicyType: (state, action) => {
      state.purchase.type = action.payload;
    },
    purchasePolicyCompany: (state, action) => {
      state.purchase.company = action.payload;
    },
    calculatePolicyCost: (state, action) => {
      const { category, power, duration } = action.payload;
      // Calculate the policy cost based on given criteria (implement your actual calculation logic here)
      const insuranceData = {
        1: {
          "3-6": { PAnn: 45185, PNet: 3954, Frais: 1000, Taxes: 495, FGA: 99, PCA: 50, PrimeTTC: 5597, Commi: 791, NetVerser: 3807 },
          "7-10": { PAnn: 51080, PNet: 4470, Frais: 1000, Taxes: 547, FGA: 112, PCA: 55, PrimeTTC: 6183, Commi: 894, NetVerser: 4289 },
          "11-14": { PAnn: 65680, PNet: 5747, Frais: 1000, Taxes: 675, FGA: 144, PCA: 67, PrimeTTC: 7633, Commi: 1149, NetVerser: 5483 },
          "15-23": { PAnn: 86460, PNet: 7565, Frais: 1000, Taxes: 857, FGA: 189, PCA: 86, PrimeTTC: 9697, Commi: 1513, NetVerser: 7184 },
          "24+": { PAnn: 104145, PNet: 9113, Frais: 1000, Taxes: 1011, FGA: 228, PCA: 101, PrimeTTC: 11453, Commi: 1823, NetVerser: 8630 },
        },
        2: {
          "3-6": { PAnn: 45185, PNet: 6326, Frais: 1000, Taxes: 733, FGA: 158, PCA: 73, PrimeTTC: 8290, Commi: 1265, NetVerser: 6025 },
          "7-10": { PAnn: 51080, PNet: 7151, Frais: 1000, Taxes: 815, FGA: 179, PCA: 82, PrimeTTC: 9227, Commi: 1430, NetVerser: 6796 },
          "11-14": { PAnn: 65680, PNet: 9195, Frais: 1000, Taxes: 1020, FGA: 230, PCA: 102, PrimeTTC: 11547, Commi: 1839, NetVerser: 8708 },
          "15-23": { PAnn: 86460, PNet: 12104, Frais: 3000, Taxes: 1510, FGA: 303, PCA: 151, PrimeTTC: 17068, Commi: 2421, NetVerser: 11648 },
          "24+": { PAnn: 104145, PNet: 14580, Frais: 3000, Taxes: 1758, FGA: 365, PCA: 176, PrimeTTC: 19879, Commi: 2916, NetVerser: 13963 },
        },
        3: {
          "3-6": { PAnn: 45185, PNet: 9489, Frais: 1000, Taxes: 1049, FGA: 237, PCA: 105, PrimeTTC: 11880, Commi: 1898, NetVerser: 8982 },
          "7-10": { PAnn: 51080, PNet: 10727, Frais: 3000, Taxes: 1373, FGA: 268, PCA: 137, PrimeTTC: 15505, Commi: 2145, NetVerser: 10360 },
          "11-14": { PAnn: 65680, PNet: 13793, Frais: 3000, Taxes: 1679, FGA: 345, PCA: 168, PrimeTTC: 18985, Commi: 2759, NetVerser: 13226 },
          "15-23": { PAnn: 86460, PNet: 18157, Frais: 3000, Taxes: 2116, FGA: 454, PCA: 212, PrimeTTC: 23938, Commi: 3631, NetVerser: 17306 },
          "24+": { PAnn: 104145, PNet: 21870, Frais: 3000, Taxes: 2487, FGA: 547, PCA: 249, PrimeTTC: 28153, Commi: 4374, NetVerser: 20779 },
        }, 
        4: {
          "3-6": { PAnn: 45185, PNet: 12652, Frais: 3000, Taxes: 1565, FGA: 316, PCA: 157, PrimeTTC: 17690, Commi: 2530, NetVerser: 12159 },
          "7-10": { PAnn: 51080, PNet: 14302, Frais: 3000, Taxes: 1730, FGA: 358, PCA: 173, PrimeTTC: 19563, Commi: 2860, NetVerser: 13703 },
          "11-14": { PAnn: 65680, PNet: 18390, Frais: 3000, Taxes: 2139, FGA: 460, PCA: 215, PrimeTTC: 24203, Commi: 3678, NetVerser: 17525 },
          "15-23": { PAnn: 86460, PNet: 24209, Frais: 3000, Taxes: 2721, FGA: 605, PCA: 272, PrimeTTC: 30807, Commi: 4842, NetVerser: 22965 },
          "24+": { PAnn: 104145, PNet: 29161, Frais: 3000, Taxes: 3216, FGA: 729, PCA: 322, PrimeTTC: 36427, Commi: 27595, NetVerser: 20779 },
        },
        5: {
          "3-6": { PAnn: 45185, PNet: 15815, Frais: 3000, Taxes: 1881, FGA: 395, PCA: 188, PrimeTTC: 21280, Commi: 3163, NetVerser: 15117 },
          "7-10": { PAnn: 51080, PNet: 17878, Frais: 3000, Taxes: 2088, FGA: 447, PCA: 209, PrimeTTC: 23622, Commi: 3576, NetVerser: 17046 },
          "11-14": { PAnn: 65680, PNet: 22988, Frais: 3000, Taxes: 2599, FGA: 575, PCA: 260, PrimeTTC: 29421, Commi: 4598, NetVerser: 21824 },
          "15-23": { PAnn: 86460, PNet: 30261, Frais: 3000, Taxes: 3326, FGA: 757, PCA: 333, PrimeTTC: 37676, Commi: 6052, NetVerser: 28624 },
          "24+": { PAnn: 104145, PNet: 36451, Frais: 3000, Taxes: 3945, FGA: 911, PCA: 395, PrimeTTC: 44702, Commi: 7290, NetVerser: 34411 },
        },
        6: {
          "3-6": { PAnn: 45185, PNet: 18978, Frais: 3000, Taxes: 2198, FGA: 474, PCA: 220, PrimeTTC: 24870, Commi: 3796, NetVerser: 18074 },
          "7-10": { PAnn: 51080, PNet: 21454, Frais: 3000, Taxes: 2445, FGA: 536, PCA: 245, PrimeTTC: 27680, Commi: 4291, NetVerser: 20389 },
          "11-14": { PAnn: 65680, PNet: 27586, Frais: 3000, Taxes: 3059, FGA: 690, PCA: 306, PrimeTTC: 34640, Commi: 5517, NetVerser: 26123 },
          "15-23": { PAnn: 86460, PNet: 36313, Frais: 3000, Taxes: 3931, FGA: 908, PCA: 393, PrimeTTC: 44545, Commi: 7263, NetVerser: 34283 },
          "24+": { PAnn: 104145, PNet: 43741, Frais: 3000, Taxes: 4674, FGA: 1094, PCA: 467, PrimeTTC: 52976, Commi: 8748, NetVerser: 41228 },
        },
        6: {
          "3-6": { PAnn: 45185, PNet: 18978, Frais: 3000, Taxes: 2198, FGA: 474, PCA: 220, PrimeTTC: 24870, Commi: 3796, NetVerser: 18074 },
          "7-10": { PAnn: 51080, PNet: 21454, Frais: 3000, Taxes: 2445, FGA: 536, PCA: 245, PrimeTTC: 27680, Commi: 4291, NetVerser: 20389 },
          "11-14": { PAnn: 65680, PNet: 27586, Frais: 3000, Taxes: 3059, FGA: 690, PCA: 306, PrimeTTC: 34640, Commi: 5517, NetVerser: 26123 },
          "15-23": { PAnn: 86460, PNet: 36313, Frais: 3000, Taxes: 3931, FGA: 908, PCA: 393, PrimeTTC: 44545, Commi: 7263, NetVerser: 34283 },
          "24+": { PAnn: 104145, PNet: 43741, Frais: 3000, Taxes: 4674, FGA: 1094, PCA: 467, PrimeTTC: 52976, Commi: 8748, NetVerser: 41228 },
        },
        7: {
          "3-6": { PAnn: 45185, PNet: 22141, Frais: 3000, Taxes: 2514, FGA: 554, PCA: 251, PrimeTTC: 28460, Commi: 4428, NetVerser: 21032 },
          "7-10": { PAnn: 51080, PNet: 25029, Frais: 3000, Taxes: 2803, FGA: 626, PCA: 280, PrimeTTC: 31738, Commi: 5006, NetVerser: 23732 },
          "11-14": { PAnn: 65680, PNet: 32183, Frais: 3000, Taxes: 3518, FGA: 805, PCA: 352, PrimeTTC: 39858, Commi: 6437, NetVerser: 30421 },
          "15-23": { PAnn: 86460, PNet: 42365, Frais: 3000, Taxes: 4537, FGA: 1059, PCA: 454, PrimeTTC: 51415, Commi: 8473, NetVerser: 39942 },
          "24+": { PAnn: 104145, PNet: 51031, Frais: 3000, Taxes: 5403, FGA: 1276, PCA: 540, PrimeTTC: 61250, Commi: 10206, NetVerser: 48044 },
        },
        8: {
          "3-6": { PAnn: 45185, PNet: 25304, Frais: 3000, Taxes: 2830, FGA: 633, PCA: 283, PrimeTTC: 32050, Commi: 5061, NetVerser: 23989 },
          "7-10": { PAnn: 51080, PNet: 28605, Frais: 3000, Taxes: 3160, FGA: 715, PCA: 316, PrimeTTC: 35796, Commi: 5721, NetVerser: 27075 },
          "11-14": { PAnn: 65680, PNet: 36781, Frais: 3000, Taxes: 3978, FGA: 920, PCA: 398, PrimeTTC: 45076, Commi: 7356, NetVerser: 34720 },
          "15-23": { PAnn: 86460, PNet: 48418, Frais: 3000, Taxes: 5142, FGA: 1210, PCA: 514, PrimeTTC: 58284, Commi: 9684, NetVerser: 45600 },
          "24+": { PAnn: 104145, PNet: 58321, Frais: 3000, Taxes: 6132, FGA: 1458, PCA: 613, PrimeTTC: 69525, Commi: 11664, NetVerser: 54860 },
        },
        9: {
          "3-6": { PAnn: 45185, PNet: 28467, Frais: 3000, Taxes: 3147, FGA: 712, PCA: 315, PrimeTTC: 35640, Commi: 5693, NetVerser: 26946 },
          "7-10": { PAnn: 51080, PNet: 32180, Frais: 3000, Taxes: 3518, FGA: 805, PCA: 352, PrimeTTC: 39855, Commi: 6436, NetVerser: 30419 },
          "11-14": { PAnn: 65680, PNet: 41378, Frais: 3000, Taxes: 4438, FGA: 1034, PCA: 444, PrimeTTC: 50294, Commi: 8276, NetVerser: 39019 },
          "15-23": { PAnn: 86460, PNet: 54470, Frais: 3000, Taxes: 5747, FGA: 1362, PCA: 575, PrimeTTC: 65153, Commi: 10894, NetVerser: 51259 },
          "24+": { PAnn: 104145, PNet: 65611, Frais: 3000, Taxes: 6861, FGA: 1640, PCA: 686, PrimeTTC: 77799, Commi: 13122, NetVerser: 61677 },
        },
        10: {
          "3-6": { PAnn: 45185, PNet: 31630, Frais: 3000, Taxes: 3463, FGA: 791, PCA: 346, PrimeTTC: 39229, Commi: 6326, NetVerser: 29904 },
          "7-10": { PAnn: 51080, PNet: 35756, Frais: 3000, Taxes: 3876, FGA: 894, PCA: 388, PrimeTTC: 43913, Commi: 7151, NetVerser: 33762 },
          "11-14": { PAnn: 65680, PNet: 45976, Frais: 3000, Taxes: 4898, FGA: 1149, PCA: 490, PrimeTTC: 55513, Commi: 9195, NetVerser: 43318 },
          "15-23": { PAnn: 86460, PNet: 60522, Frais: 3000, Taxes: 6352, FGA: 1513, PCA: 635, PrimeTTC: 72022, Commi: 12104, NetVerser: 56918 },
          "24+": { PAnn: 104145, PNet: 72902, Frais: 3000, Taxes: 7590, FGA: 1823, PCA: 759, PrimeTTC: 86073, Commi: 14580, NetVerser: 68493 },
        },
        11: {
          "3-6": { PAnn: 45185, PNet: 34792, Frais: 3000, Taxes: 3779, FGA: 870, PCA: 378, PrimeTTC: 42819, Commi: 6958, NetVerser: 32861 },
          "7-10": { PAnn: 51080, PNet: 39332, Frais: 3000, Taxes: 4233, FGA: 983, PCA: 423, PrimeTTC: 47971, Commi: 7866, NetVerser: 37105 },
          "11-14": { PAnn: 65680, PNet: 50574, Frais: 3000, Taxes: 5357, FGA: 1264, PCA: 536, PrimeTTC: 60731, Commi: 10115, NetVerser: 47616 },
          "15-23": { PAnn: 86460, PNet: 66574, Frais: 3000, Taxes: 6957, FGA: 1664, PCA: 696, PrimeTTC: 78892, Commi: 13315, NetVerser: 62577 },
          "24+": { PAnn: 104145, PNet: 80192, Frais: 3000, Taxes: 8319, FGA: 2005, PCA: 832, PrimeTTC: 94348, Commi: 16038, NetVerser: 75309 },
        },
        12: {
          "3-6": { PAnn: 45185, PNet: 36148, Frais: 3000, Taxes: 3915, FGA: 904, PCA: 391, PrimeTTC: 44358, Commi: 7230, NetVerser: 34128 },
          "7-10": { PAnn: 51080, PNet: 40864, Frais: 3000, Taxes: 4386, FGA: 1022, PCA: 439, PrimeTTC: 49711, Commi: 8173, NetVerser: 38538 },
          "11-14": { PAnn: 65680, PNet: 52544, Frais: 3000, Taxes: 5554, FGA: 1314, PCA: 555, PrimeTTC: 62967, Commi: 10509, NetVerser: 49459 },
          "15-23": { PAnn: 86460, PNet: 69168, Frais: 3000, Taxes: 7217, FGA: 1729, PCA: 722, PrimeTTC: 81836, Commi: 13834, NetVerser: 65002 },
          "24+": { PAnn: 104145, PNet: 83316, Frais: 3000, Taxes: 8632, FGA: 2083, PCA: 863, PrimeTTC: 97894, Commi: 16663, NetVerser: 78230 },
        }
      };
      function getPowerRange(power) {
        if (power >= 3 && power <= 6) return '3-6';
        if (power >= 7 && power <= 10) return '7-10';
        if (power >= 11 && power <= 14) return '11-14';
        if (power >= 15 && power <= 23) return '15-23';
        if (power >= 24) return '24+';
        return null;
      }
      const powerRange = getPowerRange(power); 
      const costData = insuranceData[duration]?.[powerRange];
      if (!costData) {
        state.purchase.cost.isError = true;
        state.purchase.cost.value = 0;
        return;
      }
      state.purchase.cost.value = costData.PrimeTTC;
      state.purchase.cost.isError = false;
    }, 
    saveVehicleDetails: (state, action) => {
      state.purchase.vehicle = action.payload;
    },
    saveOwnerDetails: (state, action) => {
      state.purchase.owner = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPolicies.pending, (state) => {
        state.policies.isLoading = true;
        state.policies.isSuccess = false;
        state.policies.isError = false;
      })
      .addCase(getPolicies.fulfilled, (state, action) => {
        state.policies.isLoading = false;
        state.policies.isSuccess = true;
        state.policies.data = action.payload;
      })
      .addCase(getPolicies.rejected, (state, action) => {
        state.policies.isLoading = false;
        state.policies.isError = true;
        state.policies.message = action.payload;
        state.policies.data = [];
      });
  }
});

// Export actions and reducer
export const { 
  toggleMenu, 
  purchasePolicyType, 
  purchasePolicyCompany, 
  calculatePolicyCost, 
  saveVehicleDetails, 
  saveOwnerDetails
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
