import {
  HeaderRoot,
  Loading,
  InputBlock,
  DateTimePickerBlock,
  PickerBlock,
  ChangeAvatarBlock,
  ModalLoading,
  LazyLoading,
} from "@/components";
import { settings } from "@/config";
import {
  Button,
  Container,
  Content,
  Form,
  Text,
  Toast,
  View,
} from "native-base";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  InteractionManager,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { uploadUserInfo, uploadFile } from "@/api/UploadFile";
import { EditUserData, UserData } from "@/types/User";
import {
  getCities,
  getCountries,
  getDistricts,
  getJobs,
  getNations,
  getWards,
} from "@/api/Catalogue";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  CityData,
  CountryData,
  DistrictData,
  JobData,
  NationData,
  WardData,
} from "@/types/Base";
import { logout } from "@/store/reducers/UserSlice";
import { EditPatientProfileProps } from "@/navigation/types/profile";
import { Modalize } from "react-native-modalize";

const { padding, blueColor } = settings.styles;
const { genders, bloods } = settings.defaultData;

const EditPatientProfile: FC<EditPatientProfileProps> = ({ navigation }) => {
  // user
  const user = useAppSelector((state) => state.user.current) as UserData;
  const dispatch = useAppDispatch();

  // image picker
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  const pickAvatar = (img: string) => {
    setAvatar(img);
    setValue("avatar", img);
  };

  // use hook form
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<EditUserData>();

  const onValueChange = (k, v, callBack_k?, callBack_v?, type?: number) => {
    setValue(k, v);
    if (callBack_k && callBack_v) {
      setValue(callBack_k, callBack_v);
    }
    if (type) {
      setRefresh((prev) => ({ num: type, toggle: !prev.toggle }));
    }
  };

  const onTrigger = (k) => {
    trigger(k);
  };

  useEffect(() => {
    register("userFullName", {
      required: true,
      minLength: 6,
      pattern: new RegExp(
        "^[a-zA-Z ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????]+$"
      ),
    });
    register("phone", {
      required: true,
      minLength: 9,
      maxLength: 11,
      pattern: new RegExp("^[0-9]+$"),
    });
    register("email", {
      required: true,
      pattern: new RegExp("[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
    });
    register("certificateNo", {
      required: true,
      minLength: 9,
      pattern: new RegExp("^[0-9]+$"),
    });
    register("address", {
      required: true,
    });
    register("birthDate", {
      required: true,
    });
    register("gender", {
      required: true,
    });
    register("countryId", {
      required: true,
    });
    register("countryName", {
      required: true,
    });
    register("jobId", {
      required: true,
    });
    register("jobName", {
      required: true,
    });
    register("cityId", {
      required: true,
      validate: (value) => value !== null,
    });
    register("cityName", {
      required: true,
      validate: (value) => value !== null,
    });
    register("districtId", {
      required: true,
      validate: (value) => value !== null,
    });
    register("districtName", {
      required: true,
      validate: (value) => value !== null,
    });
    register("wardId", {
      required: true,
      validate: (value) => value !== null,
    });
    register("wardName", {
      required: true,
      validate: (value) => value !== null,
    });
    register("nationId", {
      required: true,
      validate: (value) => value !== null,
    });
    register("nationName", {
      required: true,
      validate: (value) => value !== null,
    });
    register("height", {
      required: true,
      pattern: new RegExp("^[0-9]+$"),
    });
    register("weight", {
      required: true,
      pattern: new RegExp("^[0-9]+$"),
    });
    register("bloodType", {
      required: true,
    });
  }, [register]);

  const [loading, setLoading] = useState(false);
  const _onPress = async (data: EditUserData) => {
    setLoading(true);
    if (data.avatar) {
      await uploadFile(data.avatar).then((res) =>
        uploadUserInfo(data, user, res.Data)
      );
      // .then(() => setRelogin(true));
    } else {
      await uploadUserInfo(data, user);
    }
    setLoading(false);
  };

  const _onError = () => {
    Toast.show({
      text: "Vui l??ng ??i???n ?????y ????? th??ng tin",
      duration: 3000,
    });
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
  const [jobs, setjobs] = useState<Array<JobData>>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getJobs();
        setjobs([...res.Data]);
        setReady((prev) => prev + 1);
      } catch (error) {
        throw new Error("Error fetch jobs data !");
      }
    })();
  }, []);

  // ++ nations / cities / districts / wards
  const [nations, setnations] = useState<Array<NationData>>([]);
  const [cities, setCities] = useState<Array<CityData>>([]);
  const [districts, setdistricts] = useState<Array<DistrictData>>([]);
  const [wards, setwards] = useState<Array<WardData>>([]);

  const refreshValuenationAndcity = useCallback(() => {
    setValue("nationId", null);
    setValue("cityId", null);
  }, []);

  const getDataNationsAndCities = useCallback(async (countryId: number) => {
    const countriesData = await getCities(countryId);
    setCities(countriesData.Data);
    const nationsData = await getNations(countryId);
    setnations(nationsData.Data);
  }, []);

  const refreshValuedistrict = useCallback(() => {
    setValue("districtId", null);
  }, []);

  const getDatadistricts = useCallback(async (cityId: number) => {
    const res = await getDistricts(cityId);
    setdistricts(res.Data);
  }, []);

  const refreshValueward = useCallback(() => {
    setValue("wardId", null);
  }, []);

  const getDatawards = useCallback(async (districtId: number) => {
    const res = await getWards(districtId);
    setwards([...res.Data]);
  }, []);

  const [refresh, setRefresh] = useState({
    num: 0,
    toggle: true,
  });

  useEffect(() => {
    (async () => {
      const { num } = refresh;
      try {
        setLoading(true);
        if (num === 1) {
          await Promise.all([
            Promise.resolve(refreshValuenationAndcity()),
            (async () => {
              const countryId = watch("countryId");
              if (countryId) await getDataNationsAndCities(countryId);
            })(),
          ]);
        } else if (num === 2) {
          await Promise.all([
            Promise.resolve(refreshValuedistrict()),
            (async () => {
              const cityId = watch("cityId");
              if (cityId) await getDatadistricts(cityId);
            })(),
          ]);
        } else if (num === 3) {
          await Promise.all([
            Promise.resolve(refreshValueward()),
            (async () => {
              const districtId = watch("districtId");
              if (districtId) await getDatawards(districtId);
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

  return (
    <Container style={styles.container}>
      <HeaderRoot
        title="CH???NH S???A TH??NG TIN"
        previous={() => navigation.goBack()}
      />
      {ready <= 1 && <LazyLoading />}
      {ready > 1 && (
        <>
          <Content contentContainerStyle={styles.body}>
            <ChangeAvatarBlock
              setState={pickAvatar}
              avatar={avatar}
              owner="userFullName"
              placeholder="H??? V?? T??N"
              onValueChange={onValueChange}
              onTrigger={onTrigger}
              errors={errors.userFullName}
              errorMess={{
                required: "H??? v?? t??n kh??ng ???????c b??? tr???ng",
                minLength: "H??? v?? t??n ph???i ??t nh???t 6 k?? t???",
                pattern: "H??? v?? t??n kh??ng h???p l???",
              }}
            />
            <Form style={styles.frmcontrol}>
              <InputBlock
                userName
                keyboardType="numeric"
                owner="phone"
                placeholder="S??? ??I???N THO???I"
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.phone}
                errorMess={{
                  required: "S??? ??i???n tho???i kh??ng ???????c ????? tr???ng",
                  minLength: "S??? ??i???n tho???i ph???i t??? 9 ?????n 11 k?? t???",
                  maxLength: "S??? ??i???n tho???i ph???i t??? 9 ?????n 11 k?? t???",
                  pattern: "S??? ??i???n tho???i kh??ng h???p l???",
                }}
              />
              <InputBlock
                owner="email"
                placeholder="EMAIL"
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.email}
                errorMess={{
                  required: "Email kh??ng ???????c b??? tr???ng",
                  validate: "Email kh??ng h???p l???",
                }}
              />
              <InputBlock
                keyboardType="numeric"
                owner="certificateNo"
                placeholder="CMND / CCCD"
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.certificateNo}
                errorMess={{
                  required: "CMND / CCCD kh??ng ???????c b??? tr???ng",
                  minLength: "CMND / CCCD ph???i ??t nh???t 9 k?? t???",
                  pattern: "CMND / CCCD kh??ng h???p l???",
                }}
              />
              <DateTimePickerBlock
                owner="birthDate"
                placeholder="NG??Y SINH"
                errors={errors.birthDate}
                errorMess={{ required: "Vui l??ng ch???n ng??y sinh" }}
                onTrigger={onTrigger}
                onValueChange={onValueChange}
                maximumDate={new Date()}
              />
              <PickerBlock
                refresh={0}
                data={genders}
                picker
                placeholder="GI???I T??NH"
                item={{
                  itemOwner: "gender",
                  itemLabel: "Name",
                  itemValue: "Id",
                }}
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.gender}
                errorMess={{ required: "Vui l??ng ch???n gi???i t??nh" }}
              />
              <InputBlock
                owner="height"
                placeholder="CHI???U CAO (CM)"
                keyboardType="numeric"
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.height}
                errorMess={{
                  required: "Chi???u cao kh??ng ???????c b??? tr???ng",
                  pattern: "Chi???u cao ph???i l?? ki???u s???",
                }}
              />
              <InputBlock
                owner="weight"
                placeholder="C??N N???NG (KG)"
                keyboardType="numeric"
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.weight}
                errorMess={{
                  required: "C??n n???ng kh??ng ???????c b??? tr???ng",
                  pattern: "C??n n???ng ph???i l?? ki???u s???",
                }}
              />
              <PickerBlock
                data={bloods}
                refresh={0}
                picker
                placeholder="NH??M M??U"
                item={{
                  itemOwner: "bloodType",
                  itemLabel: "Name",
                  itemValue: "Name",
                }}
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.bloodType}
                errorMess={{
                  required: "Vui l??ng ch???n nh??m m??u",
                }}
              />
              <PickerBlock
                data={jobs}
                refresh={0}
                search="Nh???p ngh??? nghi???p"
                placeholder="NGH??? NGHI???P"
                item={{
                  itemOwner: "jobId",
                  itemLabel: "Name",
                  itemValue: "Id",
                }}
                callback={{ cbOwner: "jobName", cbValue: "Name" }}
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.jobId}
                errorMess={{
                  required: "Vui l??ng ch???n ngh??? nghi???p",
                }}
              />
              <PickerBlock
                data={countries}
                refresh={1}
                search="Nh???p qu???c gia"
                placeholder="QU???C GIA"
                item={{
                  itemOwner: "countryId",
                  itemLabel: "Name",
                  itemValue: "Id",
                }}
                callback={{ cbOwner: "countryName", cbValue: "Name" }}
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.jobId}
                errorMess={{ required: "Vui l??ng ch???n qu???c gia" }}
              />
              <PickerBlock
                data={nations}
                refresh={0}
                search="Nh???p d??n t???c"
                placeholder="D??N T???C"
                item={{
                  itemOwner: "nationId",
                  itemLabel: "Name",
                  itemValue: "Id",
                }}
                callback={{ cbOwner: "nationName", cbValue: "Name" }}
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.nationId}
                errorMess={{
                  required: "Vui l??ng ch???n d??n t???c",
                }}
              />
              <PickerBlock
                data={cities}
                refresh={2}
                search="Nh???p t???nh / th??nh ph???"
                placeholder="T???NH / TH??NH PH???"
                item={{
                  itemOwner: "cityId",
                  itemLabel: "Name",
                  itemValue: "Id",
                }}
                callback={{ cbOwner: "cityName", cbValue: "Name" }}
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.cityId}
                errorMess={{
                  required: "Vui l??ng ch???n t???nh / th??nh ph???",
                }}
              />
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <PickerBlock
                    data={districts}
                    refresh={3}
                    search="Nh???p qu???n / huy???n"
                    placeholder="QU???N / HUY???N"
                    item={{
                      itemOwner: "districtId",
                      itemLabel: "Name",
                      itemValue: "Id",
                    }}
                    callback={{ cbOwner: "districtName", cbValue: "Name" }}
                    onValueChange={onValueChange}
                    onTrigger={onTrigger}
                    errors={errors.districtId}
                    errorMess={{
                      required: "Vui l??ng ch???n qu???n / huy???n",
                    }}
                  />
                </View>
                <View style={{ width: padding }} />
                <View style={{ flex: 1 }}>
                  <PickerBlock
                    data={wards}
                    refresh={0}
                    search="Nh???p ph?????ng x??"
                    placeholder="PH?????NG / X??"
                    item={{
                      itemOwner: "wardId",
                      itemLabel: "Name",
                      itemValue: "Id",
                    }}
                    callback={{ cbOwner: "wardName", cbValue: "Name" }}
                    onValueChange={onValueChange}
                    onTrigger={onTrigger}
                    errors={errors.wardId}
                    errorMess={{
                      required: "Vui l??ng ch???n ph?????ng / x??",
                    }}
                  />
                </View>
              </View>
              <InputBlock
                owner="address"
                placeholder="?????A CH???"
                onValueChange={onValueChange}
                onTrigger={onTrigger}
                errors={errors.address}
                errorMess={{
                  required: "?????a ch??? kh??ng ???????c b??? tr???ng",
                }}
              />
              <TouchableWithoutFeedback
                onPress={loading ? undefined : handleSubmit(_onPress, _onError)}
              >
                <View style={styles.btn}>
                  <Text style={styles.btntext}>C???P NH???T THAY ?????I</Text>
                </View>
              </TouchableWithoutFeedback>
            </Form>
          </Content>
          <ModalLoading visible={loading} />
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
  },
  col6: {
    flex: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flexGrow: 1,
  },
  frmcontrol: {
    paddingHorizontal: padding,
  },
  btn: {
    marginVertical: 30,
    backgroundColor: blueColor,
    borderRadius: 100,
    alignSelf: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 17,
    paddingBottom: 19,
    elevation: 4,
  },
  btntext: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "SFProDisplay-Semibold",
    letterSpacing: 1.25,
  },
});

export default EditPatientProfile;
