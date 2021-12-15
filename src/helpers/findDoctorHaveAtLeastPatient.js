module.exports = (doctors) => {
  const doctor = doctors.reduce((prev, cur) => {
    // check doctor have slot enough ? , the same specialized ? 
    if (cur.patients.length >= cur.slotMax) return prev;

    // 
    if (!Object.keys(prev).length) return cur;
    if (cur.slotMax - cur.patients.length < prev.slotMax - prev.patients.length) return cur;
    else return prev;
  }, {});
  return doctor;
}