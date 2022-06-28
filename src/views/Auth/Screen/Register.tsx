import { settings } from "@/config";
import { RegisterProps } from "@/navigation/types/Auth";
import { RegisterData } from "@/types/Auth";
import { getOTPPhone, registerUser } from "@/api/Auth";
import { Container, Content, Form, Text, Toast, View } from "native-base";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  InteractionManager,
  TouchableWithoutFeedback,
} from "react-native";
import {
  DateTimePickerBlock,
  HeaderAuth,
  HeadingAuth,
  InputBlock,
  Loading,
  ModalLoading,
  PickerBlock,
} from "@/components";
import {
  CityData,
  CountryData,
  DistrictData,
  JobData,
  NationData,
  WardData,
} from "@/types/base";
import {
  getCities,
  getCountries,
  getDistricts,
  getJobs,
  getNations,
  getWards,
} from "@/api/Catalogue";
import AnimatedLottieView from "lottie-react-native";
import { Modalize } from "react-native-modalize";

const { padding, mainColor, mainColorText, dangerColor, blueColor } =
  settings.styles;
const { genders } = settings.defaultData;

type keyRequired =
  | "userFullName"
  | "phone"
  | "email"
  | "identityCardNo"
  | "password"
  | "confirmPassword"
  | "userName";

const RegisterScreen = (props: RegisterProps) => {
  // navigation
  const { navigation } = props;

  // checkbox
  const [checkbox, setCheckbox] = useState(false);
  const toggleCheckbox = () => {
    setCheckbox(!checkbox);
    if (checkbox) {
      setValue("agreement", false);
    } else {
      setValue("agreement", true);
    }
    trigger("agreement");
  };

  // ++ countries
  const [ready, setReady] = useState(0);
  const [countries, setCountries] = useState<Array<CountryData>>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCountries();
        setCountries([...res.Data]);
        setReady((prev) => prev + 1);
      } catch (error) {
        throw new Error("Error fetch countries data !");
      }
    })();
  }, []);

  // jobs
  const [jobs, setJobs] = useState<Array<JobData>>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getJobs();
        setJobs([...res.Data]);
        setReady((prev) => prev + 1);
      } catch (error) {
        throw new Error("Error fetch jobs data !");
      }
    })();
  }, []);

  // ++ nations / cities / districts / wards
  const [nations, setNations] = useState<Array<NationData>>([]);
  const [cities, setCities] = useState<Array<CityData>>([]);
  const [districts, setDistricts] = useState<Array<DistrictData>>([]);
  const [wards, setWards] = useState<Array<WardData>>([]);

  const refreshValueNationAndCity = useCallback(() => {
    setValue("nationId", null);
    setValue("cityId", null);
  }, []);

  const getDataNationsAndCities = useCallback(async (countryId: number) => {
    const countriesData = await getCities(countryId);
    setCities(countriesData.Data);
    const nationsData = await getNations(countryId);
    setNations(nationsData.Data);
  }, []);

  const refreshValueDistrict = useCallback(() => {
    setValue("districtId", null);
  }, []);

  const getDataDistricts = useCallback(async (cityId: number) => {
    const res = await getDistricts(cityId);
    setDistricts(res.Data);
  }, []);

  const refreshValueWard = useCallback(() => {
    setValue("wardId", null);
  }, []);

  const getDataWards = useCallback(async (districtId: number) => {
    const res = await getWards(districtId);
    setWards([...res.Data]);
  }, []);

  const [refresh, setRefresh] = useState({
    num: 0,
    toggle: true,
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const { num } = refresh;
      try {
        setLoading(true);
        if (num === 1) {
          await Promise.all([
            Promise.resolve(refreshValueNationAndCity()),
            (async () => {
              const countryId = watch("countryId");
              if (countryId) getDataNationsAndCities(countryId);
            })(),
          ]);
        } else if (num === 2) {
          await Promise.all([
            Promise.resolve(refreshValueDistrict()),
            (async () => {
              const cityId = watch("cityId");
              if (cityId) getDataDistricts(cityId);
            })(),
          ]);
        } else if (num === 3) {
          await Promise.all([
            Promise.resolve(refreshValueWard()),
            (async () => {
              const districtId = watch("districtId");
              if (districtId) getDataWards(districtId);
            })(),
          ]);
        }
      } catch (error) {
        throw new Error("ERROR FETCHING DATA...");
      } finally {
        setLoading(false);
      }
    })();
  }, [refresh.toggle]);

  // react hook form
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<RegisterData>();

  useEffect(() => {
    register("identityCardNo", {
      required: true,
      minLength: 9,
      pattern: new RegExp("^[0-9]+$"),
    });
    register("email", {
      required: true,
      pattern: new RegExp("[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
    });
    register("userFullName", {
      required: true,
      minLength: 6,
      pattern: new RegExp(
        "^[a-zA-Z áàảãạăắằẳẵặấầẩẫậíìĩịóòỏõọốồổỗộơớờởỡợúùủũụưứừửữựéèẻẽẹêếềểễệÁÀẢÃẠĂẮẰẲẴẶẤẦẨẪẬÍÌĨỊÓÒỎÕỌỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÉÈẺẼẸÊẾỀỂỄỆ]+$"
      ),
    });
    register("phone", {
      required: true,
      minLength: 9,
      maxLength: 11,
      pattern: new RegExp("^[0-9]+$"),
    });
    register("userName", {
      required: true,
      validate: (value) => value === watch("phone"),
    });
    register("password", {
      required: true,
      minLength: 8,
      maxLength: 128,
      pattern: new RegExp("^[a-zA-Z0-9_.-]+$"),
    });
    register("confirmPassword", {
      required: true,
      minLength: 8,
      maxLength: 128,
      validate: (value) => value === watch("password"),
      pattern: new RegExp("^[a-zA-Z0-9_.-]+$"),
    });
    register("countryId", {
      required: true,
    });
    register("nationId", {
      required: true,
      validate: (val) => val !== null,
    });
    register("cityId", {
      required: true,
      validate: (val) => val !== null,
    });
    register("districtId", {
      required: true,
      validate: (val) => val !== null,
    });
    register("wardId", {
      required: true,
      validate: (val) => val !== null,
    });
    register("jobId", {
      required: true,
    });
    register("gender", {
      required: true,
    });
    register("agreement", { required: true });
  }, [register]);

  const onValueChange = (
    k: keyRequired,
    v,
    callBack_k?: keyRequired,
    callBack_v?,
    type?: number
  ) => {
    setValue(k, v);
    if (callBack_k && callBack_v) {
      setValue(callBack_k, callBack_v);
    }
    if (type) {
      setRefresh((prev) => ({ num: type, toggle: !prev.toggle }));
    }
  };

  const onTrigger = (k: keyRequired) => {
    trigger(k);
  };

  const _onPress = async (data: RegisterData) => {
    setLoading(true);
    registerUser(data)
      .then(() => getOTPPhone(data.phone))
      .then(() => new Promise((resolve) => setTimeout(resolve, 2000)))
      .then(() =>
        navigation.navigate("ConfirmOTP", {
          phone: data.phone,
          type: "phone",
          email: null,
        })
      )
      .catch((err) => Toast.show({ text: err.response.data.ResultMessage }))
      .finally(() => {
        setLoading(false);
      });
  };

  const _onError = () => {
    Toast.show({
      text: "Vui lòng điền đầy đủ thông tin",
    });
  };

  return (
    <Container style={styles.container}>
      <HeaderAuth />
      <Content style={styles.body}>
        <HeadingAuth text="ĐĂNG KÝ NGAY" align="left" />
        <Form style={styles.frmcontrol}>
          <InputBlock
            owner="userFullName"
            placeholder="HỌ VÀ TÊN"
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.userFullName}
            errorMess={{
              required: "Họ và tên không được bỏ trống",
              minLength: "Họ và tên phải ít nhất 6 kí tự",
              pattern: "Họ và tên không hợp lệ",
            }}
          />
          <InputBlock
            userName
            keyboardType="numeric"
            owner="phone"
            placeholder="SỐ ĐIỆN THOẠI"
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.phone}
            errorMess={{
              required: "Số điện thoại không được để trống",
              minLength: "Số điện thoại phải từ 9 đến 11 kí tự",
              maxLength: "Số điện thoại phải từ 9 đến 11 kí tự",
              pattern: "Số điện thoại không hợp lệ",
            }}
          />
          <InputBlock
            owner="email"
            placeholder="EMAIL"
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.email}
            errorMess={{
              required: "Email không được bỏ trống",
              validate: "Email không hợp lệ",
            }}
          />
          <InputBlock
            keyboardType="numeric"
            owner="identityCardNo"
            placeholder="CMND / CCCD"
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.identityCardNo}
            errorMess={{
              required: "CMND / CCCD không được bỏ trống",
              minLength: "CMND / CCCD phải ít nhất 9 kí tự",
              pattern: "CMND / CCCD không hợp lệ",
            }}
          />
          <DateTimePickerBlock
            owner="birthDate"
            placeholder="NGÀY SINH"
            errors={errors.birthDate}
            errorMess={{ required: "Vui lòng chọn ngày sinh" }}
            onTrigger={onTrigger}
            onValueChange={onValueChange}
            maximumDate={new Date()}
          />
          <PickerBlock
            refresh={0}
            data={genders}
            picker
            placeholder="GIỚI TÍNH"
            item={{
              itemOwner: "gender",
              itemLabel: "Name",
              itemValue: "Id",
            }}
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.gender}
            errorMess={{ required: "VUI LÒNG CHỌN GIỚI TÍNH" }}
          />
          <PickerBlock
            data={jobs}
            refresh={0}
            search="Nhập nghề nghiệp"
            placeholder="NGHỀ NGHIỆP"
            item={{
              itemOwner: "jobId",
              itemLabel: "Name",
              itemValue: "Id",
            }}
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.jobId}
            errorMess={{
              required: "VUI LÒNG CHỌN NGHỀ NGHIỆP",
            }}
          />
          <PickerBlock
            data={countries}
            refresh={1}
            search="Nhập quốc gia"
            placeholder="QUỐC GIA"
            item={{
              itemOwner: "countryId",
              itemLabel: "Name",
              itemValue: "Id",
            }}
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.countryId}
            errorMess={{ required: "VUI LÒNG CHỌN QUỐC GIA" }}
          />
          <PickerBlock
            data={nations}
            refresh={0}
            search="Nhập dân tộc"
            placeholder="DÂN TỘC"
            item={{
              itemOwner: "nationId",
              itemLabel: "Name",
              itemValue: "Id",
            }}
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.nationId}
            errorMess={{
              required: "VUI LÒNG CHỌN DÂN TỘC",
            }}
          />
          <PickerBlock
            data={cities}
            refresh={2}
            search="Nhập tỉnh / thành phố"
            placeholder="TỈNH / THÀNH PHỐ"
            item={{
              itemOwner: "cityId",
              itemLabel: "Name",
              itemValue: "Id",
            }}
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.cityId}
            errorMess={{
              required: "VUI LÒNG CHỌN TỈNH THÀNH PHỐ",
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <PickerBlock
                data={districts}
                refresh={3}
                search="Nhập quận / huyện"
                placeholder="QUẬN / HUYỆN"
                item={{
                  itemOwner: "districtId",
                  itemLabel: "Name",
                  itemValue: "Id",
                }}
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.districtId}
                errorMess={{
                  required: "VUI LÒNG CHỌN QUẬN / HUYỆN",
                }}
              />
            </View>
            <View style={{ width: padding }} />
            <View style={{ flex: 1 }}>
              <PickerBlock
                data={wards}
                refresh={0}
                search="Nhập phường xã"
                placeholder="PHƯỜNG / XÃ"
                item={{
                  itemOwner: "wardId",
                  itemLabel: "Name",
                  itemValue: "Id",
                }}
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.wardId}
                errorMess={{
                  required: "VUI LÒNG CHỌN PHƯỜNG XÃ",
                }}
              />
            </View>
          </View>
          <InputBlock
            owner="address"
            placeholder="ĐỊA CHỈ"
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.address}
            errorMess={{
              required: "ĐỊA CHỈ KHÔNG ĐƯỢC BỎ TRỐNG",
              minLength: "ĐỊA CHỈ PHẢI TỪ 8 ĐẾN 128 KÍ TỰ",
              maxLength: "ĐỊA CHỈ PHẢI TỪ 8 ĐẾN 128 KÍ TỰ",
              pattern: "ĐỊA CHỈ KHÔNG ĐƯỢC CÓ KÍ TỰ ĐẶC BIỆT",
            }}
          />
          <InputBlock
            hide
            owner="password"
            placeholder="MẬT KHẨU"
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.password}
            errorMess={{
              required: "Mật khẩu không được bỏ trống",
              minLength: "Mật khẩu phải từ 8 đến 128 kí tự",
              maxLength: "Mật khẩu phải từ 8 đến 128 kí tự",
              pattern: "Mật khẩu không được có kí tự đặc biệt",
            }}
          />
          <InputBlock
            hide
            owner="confirmPassword"
            placeholder="NHẬP LẠI MẬT KHẨU"
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.confirmPassword}
            errorMess={{
              required: "Mật khẩu không được bỏ trống",
              minLength: "Mật khẩu phải từ 8 đến 128 kí tự",
              maxLength: "Mật khẩu phải từ 8 đến 128 kí tự",
              pattern: "Mật khẩu không được có kí tự đặc biệt",
              validate: "Vui lòng nhập giống mật khẩu trên",
            }}
          />
          <View style={styles.commit}>
            <View style={{ flexDirection: "row" }}>
              {!checkbox && (
                <TouchableWithoutFeedback onPress={toggleCheckbox}>
                  <View style={styles.commitcheckboxoff} />
                </TouchableWithoutFeedback>
              )}
              {checkbox && (
                <TouchableWithoutFeedback onPress={toggleCheckbox}>
                  <AnimatedLottieView
                    progress={1}
                    source={require("@/assets/icons/checkbox")}
                    style={styles.commitcheckboxon}
                  />
                </TouchableWithoutFeedback>
              )}
              <Text style={styles.committext}>
                Tôi đông ý với{" "}
                <Text style={styles.commitlink}>điều khoản sử dụng</Text> &{" "}
                <Text style={styles.commitlink}>chính sách bảo mật</Text>
              </Text>
            </View>
            {errors.agreement && (
              <Text style={styles.error}>
                Vui lòng đồng ý với điều khoản và chính sách của chúng tôi
              </Text>
            )}
          </View>
          <TouchableWithoutFeedback
            onPress={loading ? undefined : handleSubmit(_onPress, _onError)}
          >
            <View style={styles.submit}>
              <Text style={styles.submittext}>Đăng ký</Text>
            </View>
          </TouchableWithoutFeedback>
        </Form>
      </Content>
      <ModalLoading visible={loading} />
    </Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    paddingHorizontal: padding,
  },
  register: {
    fontSize: 36,
    lineHeight: 40,
    fontFamily: "SFProDisplay-Bold",
    color: mainColorText,
  },
  frmcontrol: {},
  error: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
    color: dangerColor,
    fontFamily: "SFProDisplay-Regular",
  },
  commit: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  commitcheckboxoff: {
    width: 20,
    height: 20,
    borderRadius: 28,
    borderWidth: 1.4,
    borderColor: "#8794BE",
    marginRight: 9,
    top: 2,
  },
  commitcheckboxon: {
    position: "relative",
    left: -2,
    width: 29,
    height: 29,
  },
  committext: {
    fontSize: 16,
    lineHeight: 21,
    color: mainColorText,
    fontFamily: "SFProDisplay-Regular",
    flex: 1,
    letterSpacing: 1.25,
  },
  commitlink: {
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 16,
    lineHeight: 21,
    color: blueColor,
  },
  submit: {
    elevation: 4,
    backgroundColor: blueColor,
    alignSelf: "flex-end",
    marginVertical: 24,
    paddingHorizontal: 57,
    paddingTop: 15,
    paddingBottom: 17,
    borderRadius: 100,
  },
  submittext: {
    fontSize: 16,
    letterSpacing: 1.25,
    color: "#fff",
    fontFamily: "SFProDisplay-Semibold",
  },
  loading: {
    ...(StyleSheet.absoluteFill as {}),
    backgroundColor: "#ffffff3a",
  },
  modalinner: {
    backgroundColor: "#fff",
    alignSelf: "center",
    padding: 12,
    borderRadius: 2,
    width: "80%",
  },
  modalicon: {},
  modaltext: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "SFProDisplay-Regular",
    textAlign: "center",
    color: mainColorText,
  },
});

export default RegisterScreen;
