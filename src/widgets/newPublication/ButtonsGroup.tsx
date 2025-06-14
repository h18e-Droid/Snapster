
import { Button } from "@/shared/ui/button"
import "./newPublication.scss"

type Props = {
  addFileFoo:()=>void
};
export const ButtonsGroup = (props: Props) => {
  return (
    <div className="buttons-container">
        <Button className={'width-for-newPublished'} variant="primary" onClick={props.addFileFoo} style={{ marginBottom: 14 }}>
          Select from Computer
        </Button>
        <Button className={'width-for-newPublishedSmall'} variant="outline" style={{ marginBottom: 18 }}>
          Open draft
        </Button>
    </div>
  )
}