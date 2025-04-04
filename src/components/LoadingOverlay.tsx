type Props = {
  show: boolean
}
export default function LoadingOverlay(props: Props) {
  const { show } = props

  return (
    <>
      {show && (
        <div className="absolute z-30 inset-0 bg-gray-500/50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}
    </>
  )
}
