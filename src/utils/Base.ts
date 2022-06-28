class Format {
  getDateOfWeek = (date: Date) => {
    const day = new Date(date).getDay();
    let result = "Chủ nhật";
    if (day === 1) result = "Thứ 2";
    else if (day === 2) result = "Thứ 3";
    else if (day === 3) result = "Thứ 4";
    else if (day === 4) result = "Thứ 5";
    else if (day === 5) result = "Thứ 6";
    else if (day === 6) result = "Thứ 7";
    return result;
  };

  getVNDate = (date?: Date) => {
    if (date) {
      const currentDate = new Date(date);
      let day: any = currentDate.getDate();
      let month: any = currentDate.getMonth() + 1;
      let year: any = currentDate.getFullYear();
      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;
      return day + " tháng " + month + ", " + year;
    }
    return "Date is undefined.";
  };

  getShortVNDate = (date?: Date | null) => {
    if (date) {
      const currentDate = new Date(date);
      let day: any = currentDate.getDate();
      let month: any = currentDate.getMonth() + 1;
      let year: any = currentDate.getFullYear();
      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;
      return day + "/" + month + "/" + year;
    }
    return undefined;
  };

  getListYear = () => {
    let arr: Array<object> = [];
    const year = new Date().getFullYear();
    for (let i = 1974; i <= year; i++) {
      arr.push({ value: i.toString() });
    }
    return arr;
  };

  hidePassword = (text: string) => {
    const len = text.length;
    let newPass = "";
    for (let i = 0; i < len; i++) {
      newPass += "*";
    }
    return newPass;
  };

  getCurrentAddress = (
    address?: string,
    ward?: string,
    district?: string,
    city?: string
  ) => {
    if (address && ward && district && city)
      return address + ", P." + ward + ", Q." + district + ", TP." + city;
    return "Address is undefined";
  };

  getAge = (dateOfBirth: Date) => {
    const diff_ms = Date.now() - dateOfBirth.getTime();
    const age = new Date(diff_ms);

    return Math.abs(age.getUTCFullYear() - 1970);
  };

  shortContent = (content: string) => {
    return content.length > 30 ? content.substring(0, 31) + "..." : content;
  };

  getYYMMDDDD = (date: Date) => {
    const currentDate = new Date(date);
    let day: any = currentDate.getDate();
    let month: any = currentDate.getMonth() + 1;
    let year: any = currentDate.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return year + "-" + month + "-" + day;
  };

  getShortSession = (session: string) => {
    const splitSession = session.split(" ");
    const currentSession = splitSession[1];
    return currentSession[0].toUpperCase() + currentSession.slice(1);
  };
}

const _format = new Format();
export default _format;
