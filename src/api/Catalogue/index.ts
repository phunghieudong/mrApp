import instance from "../instance";

export const getCountries = async () => {
  try {
    const res = await instance.get("/catalogue/get-country-catalogue");
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCities = async (countryId: number) => {
  try {
    const res = await instance.get("/catalogue/get-city-catalogue/countryId", {
      params: { countryId },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDistricts = async (cityId: number) => {
  try {
    const res = await instance.get("/catalogue/get-district-catalogue/cityId", {
      params: { cityId },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getWards = async (districtId: number) => {
  try {
    const res = await instance.get(
      "/catalogue/get-ward-catalogue/cityId/districtId",
      {
        params: { districtId },
      }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getNations = async (countryId: number) => {
  try {
    const res = await instance.get(
      "/catalogue/get-nation-catalogue/countryId",
      {
        params: {
          countryId,
        },
      }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getJobs = async () => {
  try {
    const res = await instance.get("/catalogue/get-job-catalogue");
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getHospitals = async () => {
  try {
    const res = await instance.get("/catalogue/get-hospital-catalogue");
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getServices = async (hospitalId: number) => {
  try {
    const res = await instance.get(
      "/catalogue/get-service-type-by-hospital-catalogue",
      { params: { hospitalId } }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getSpeciallistType = async (hospitalId: number) => {
  try {
    const res = await instance.get(
      "/catalogue/get-specialist-type-catalogue/hospitalId",
      { params: { hospitalId } }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDegree = async (hospitalId: number) => {
  try {
    const res = await instance.get(
      "/catalogue/get-degree-type-catalogue/hospitalId",
      { params: { hospitalId } }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getSession = async () => {
  try {
    const res = await instance.get("/catalogue/get-session-type-catalogue");
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDays = async () => {
  try {
    const res = await instance.get("/catalogue/get-day-of-week-catalogue");
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getVaccines = async (hospitalId: number) => {
  try {
    const res = await instance.get(
      "/catalogue/get-vaccine-type-catalogue/hospitalId",
      { params: { hospitalId } }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllergy = async () => {
  try {
    const res = await instance.get("/catalogue/get-allergy-type-catalogue");
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDiagnoticType = async (hospitalId: number) => {
  try {
    const res = await instance.get(
      "/catalogue/get-diagnotic-type-catalogue/hospitalId",
      { params: { hospitalId } }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
