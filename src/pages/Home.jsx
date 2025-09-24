import { useEffect, useState } from 'react';
import useStock from '../hooks/useStock'
import dayjs from 'dayjs';
import RecentItemsTable from '../components/RecentItemsTable';
import RunningOutItemsTable from '../components/RunningOutItemsTable';

export default function Home() {
    const {itemsController} = useStock();

    const [diversityCount, setDiversityCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [runningOutCount, setRunningOutCount] = useState(0);
    const [recentCount, setRecentCount] = useState(0);

    useEffect(function() {
        const fetchAndSetCounts = async () => {
            Promise.all([
                itemsController.countByCategories(),
                itemsController.countAll(),
                itemsController.countByCreationDate({
                    before: dayjs().add(1, 'day').format('YYYY-MM-DD'),
                    after: dayjs().subtract(10, 'days').format('YYYY-MM-DD')
                }),
                itemsController.countByQuantity({
                    min: 0,
                    max: 10
                })
            ]).then((values) => {
                console.log(values);
                setDiversityCount(values[0].data);
                setTotalCount(values[1].data);
                setRecentCount(values[2].data);
                setRunningOutCount(values[3].data);
            });
        }

        fetchAndSetCounts();
    }, []);

    return (
        <main>
            <h1>Dashboard</h1>

            <div className="row">

                <div className="dashboard-card">
                    Diversidade
                    <span>{diversityCount}</span>
                </div>

                <div className="dashboard-card">
                    Inventário total
                    <span>{totalCount}</span>
                </div>

                <div className="dashboard-card">
                    Recentes
                    <span>{recentCount}</span>
                </div>

                <div className="dashboard-card">
                    Acabando
                    <span>{runningOutCount}</span>
                </div>

            </div>

            <div class="table-grid">
                <div>
                    <RecentItemsTable />
                </div>
                <div>
                    <RunningOutItemsTable />
                </div>
            </div>
        </main>
    )
}