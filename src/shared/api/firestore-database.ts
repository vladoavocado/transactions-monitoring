/* eslint-disable no-underscore-dangle */
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  setDoc,
  limit,
  orderBy,
  Query,
  CollectionReference,
  writeBatch,
} from 'firebase/firestore';

import { ReactiveApi } from 'src/shared/types';
import IDatabase = ReactiveApi.IDatabase;
import IDatabaseSubscription = ReactiveApi.IDatabaseSubscription;
import IDatabaseQuery = ReactiveApi.IDatabaseQuery;

export class FirebaseDatabase implements IDatabase {
  private db = getFirestore();

  private subscriptions: IDatabaseSubscription[] = [];

  private _query(
    path: string,
    queryObj: IDatabaseQuery,
  ): Query | CollectionReference {
    let firestoreQuery: Query | CollectionReference = collection(this.db, path);

    if (queryObj.whereConditions) {
      queryObj.whereConditions.forEach(({ fieldPath, filter, value }) => {
        firestoreQuery = query(firestoreQuery, where(fieldPath, filter, value));
      });
    }

    if (queryObj.orderByConditions) {
      queryObj.orderByConditions.forEach(({ fieldPath, direction = 'asc' }) => {
        firestoreQuery = query(firestoreQuery, orderBy(fieldPath, direction));
      });
    }

    if (queryObj.limit !== undefined) {
      firestoreQuery = query(firestoreQuery, limit(queryObj.limit));
    }

    return firestoreQuery;
  }

  async get<T>(path: string, queryObj?: IDatabaseQuery): Promise<T> {
    const q = this._query(path, queryObj || ({} as IDatabaseQuery));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(snapshotDoc =>
      snapshotDoc.data(),
    ) as unknown as T;
  }

  async set<D extends Record<string, any>, T>(
    path: string,
    data: D,
    id: string,
  ): Promise<T> {
    const docRef = doc(this.db, path, id);
    await setDoc(docRef, data, { merge: true });
    return { id: docRef.id, ...data } as unknown as T;
  }

  async setMultiple<D extends Record<string, any>, T>(
    path: string,
    data: D,
    ids: string[],
  ): Promise<T[]> {
    const batch = writeBatch(this.db);
    const results: T[] = [];

    ids.forEach(id => {
      const docRef = doc(this.db, path, id);
      batch.set(docRef, data, { merge: true });
      results.push({ id: docRef.id, ...data } as unknown as T);
    });

    await batch.commit();
    return results;
  }

  async delete<T>(path: string): Promise<T> {
    const docRef = doc(this.db, path);
    await deleteDoc(docRef);
    return { id: docRef.id } as unknown as T;
  }

  subscribe<T>(
    path: string,
    onUpdate: (data: T) => void,
    queryObj?: IDatabaseQuery,
  ): IDatabaseSubscription[] {
    const q = this._query(path, queryObj || ({} as IDatabaseQuery));
    const subscription = onSnapshot(q, querySnapshot => {
      const data = querySnapshot.docs.map(snapshotDoc => ({
        id: snapshotDoc.id,
        ...snapshotDoc.data(),
      })) as unknown as T;
      onUpdate(data);
    });

    this.subscriptions.push(subscription);

    return this.subscriptions;
  }
}
