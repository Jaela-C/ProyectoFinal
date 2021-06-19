import MediaCard from '@/components/Carousel';
import CardInformation from '@/components/CardInformation'
import InformationAdmin from '@/components/InformationAdmin'
import InformationUser from '@/components/InformationUser'
import AppMovil from '@/components/AppMovil'
import {ThemeProvider} from "@material-ui/core";

export default function Home() {
  return (
    <div>
      <MediaCard></MediaCard>
      <CardInformation></CardInformation>
      <InformationAdmin></InformationAdmin>
      <MediaCard></MediaCard>
      <InformationUser></InformationUser>
      <AppMovil></AppMovil>
    </div>
  )
}