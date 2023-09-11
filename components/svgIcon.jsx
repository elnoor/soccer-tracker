export default function SvgIcon({ pathData, fill = "currentColor" }) {
  return (
    <svg width="16" height="16" fill={fill} viewBox="0 0 16 16">
      <path fill-rule="evenodd" d={pathData} />
    </svg>
  );
}
